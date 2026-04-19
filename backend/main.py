from fastapi import FastAPI, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import httpx
import os
from dotenv import load_dotenv
import logging

load_dotenv()

# Initialize FastAPI app
app = FastAPI(title="ThreatLab Network Scanner API", version="1.0.0")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Constants
SHODAN_API_KEY = os.getenv("SHODAN_API_KEY", "")
SHODAN_BASE_URL = "https://api.shodan.io"

# Request/Response Models
class ScanRequest(BaseModel):
    target: str
    scan_type: str = "host"  # host, dns, ssl

class ScanResult(BaseModel):
    success: bool
    data: Optional[dict] = None
    error: Optional[str] = None

# Shodan API Client
class ShodanClient:
    def __init__(self, api_key: str):
        self.api_key = api_key
        self.base_url = SHODAN_BASE_URL
        
    async def get_host_info(self, ip: str):
        """Get detailed information about a host from Shodan"""
        try:
            async with httpx.AsyncClient(timeout=30) as client:
                response = await client.get(
                    f"{self.base_url}/shodan/host/{ip}",
                    params={"key": self.api_key, "minify": False}
                )
                if response.status_code == 200:
                    return response.json()
                else:
                    raise HTTPException(status_code=response.status_code, detail="Failed to fetch from Shodan")
        except Exception as e:
            logger.error(f"Shodan API error: {str(e)}")
            raise HTTPException(status_code=500, detail=f"Error fetching Shodan data: {str(e)}")
    
    async def search(self, query: str):
        """Search Shodan for hosts matching a query"""
        try:
            async with httpx.AsyncClient(timeout=30) as client:
                response = await client.get(
                    f"{self.base_url}/shodan/host/search",
                    params={"key": self.api_key, "query": query}
                )
                if response.status_code == 200:
                    return response.json()
                else:
                    raise HTTPException(status_code=response.status_code, detail="Shodan search failed")
        except Exception as e:
            logger.error(f"Shodan search error: {str(e)}")
            raise HTTPException(status_code=500, detail=f"Error searching Shodan: {str(e)}")
    
    async def get_dns_record(self, domain: str):
        """Get DNS records for a domain"""
        try:
            async with httpx.AsyncClient(timeout=30) as client:
                response = await client.get(
                    f"{self.base_url}/dns/resolve",
                    params={"key": self.api_key, "domain": domain}
                )
                if response.status_code == 200:
                    return response.json()
                else:
                    raise HTTPException(status_code=response.status_code, detail="DNS lookup failed")
        except Exception as e:
            logger.error(f"DNS lookup error: {str(e)}")
            raise HTTPException(status_code=500, detail=f"Error resolving DNS: {str(e)}")

# Initialize Shodan client
if not SHODAN_API_KEY:
    logger.warning("SHODAN_API_KEY not set in environment variables")

shodan_client = ShodanClient(SHODAN_API_KEY)

# Routes
@app.get("/")
async def root():
    """Health check endpoint"""
    return {
        "status": "ok",
        "service": "ThreatLab Network Scanner API",
        "version": "1.0.0"
    }

@app.post("/api/scan")
async def scan(request: ScanRequest):
    """
    Main scanning endpoint
    Supports: IP addresses, IP ranges (CIDR), and domain names
    """
    try:
        target = request.target.strip()
        scan_type = request.scan_type.lower()
        
        if not target:
            raise HTTPException(status_code=400, detail="Target cannot be empty")
        
        if not SHODAN_API_KEY:
            raise HTTPException(status_code=500, detail="Shodan API key not configured")
        
        # Determine if target is domain or IP
        is_domain = "." in target and not target.replace(".", "").isdigit() and "/" not in target
        is_cidr = "/" in target
        
        result_data = {}
        
        if is_domain:
            # DNS resolution and host info
            logger.info(f"Resolving domain: {target}")
            dns_info = await shodan_client.get_dns_record(target)
            result_data["dns"] = dns_info
            
            # Get host info for resolved IP
            if "A" in dns_info:
                for ip in dns_info["A"]:
                    host_info = await shodan_client.get_host_info(ip)
                    result_data[f"host_{ip}"] = host_info
        
        elif is_cidr:
            # CIDR range search
            logger.info(f"Searching CIDR range: {target}")
            search_results = await shodan_client.search(f"net:{target}")
            result_data["search"] = search_results
        
        else:
            # Single IP address
            logger.info(f"Scanning IP: {target}")
            host_info = await shodan_client.get_host_info(target)
            result_data["host"] = host_info
        
        return ScanResult(
            success=True,
            data={
                "target": target,
                "scan_type": scan_type,
                "results": result_data
            }
        )
    
    except HTTPException as e:
        logger.error(f"HTTP Error: {e.detail}")
        return ScanResult(success=False, error=str(e.detail))
    except Exception as e:
        logger.error(f"Unexpected error: {str(e)}")
        return ScanResult(success=False, error=f"An unexpected error occurred: {str(e)}")

@app.post("/api/host-info")
async def get_host_info(request: ScanRequest):
    """Get detailed information about a specific host"""
    try:
        ip = request.target.strip()
        
        if not ip:
            raise HTTPException(status_code=400, detail="IP address cannot be empty")
        
        if not SHODAN_API_KEY:
            raise HTTPException(status_code=500, detail="Shodan API key not configured")
        
        host_info = await shodan_client.get_host_info(ip)
        
        return ScanResult(
            success=True,
            data={
                "target": ip,
                "host_info": host_info
            }
        )
    except Exception as e:
        logger.error(f"Error: {str(e)}")
        return ScanResult(success=False, error=str(e))

@app.post("/api/search")
async def search(request: ScanRequest):
    """Search Shodan with a custom query"""
    try:
        query = request.target.strip()
        
        if not query:
            raise HTTPException(status_code=400, detail="Query cannot be empty")
        
        if not SHODAN_API_KEY:
            raise HTTPException(status_code=500, detail="Shodan API key not configured")
        
        results = await shodan_client.search(query)
        
        return ScanResult(
            success=True,
            data=results
        )
    except Exception as e:
        logger.error(f"Error: {str(e)}")
        return ScanResult(success=False, error=str(e))

@app.get("/api/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "api_configured": bool(SHODAN_API_KEY),
        "service": "Network Scanner API"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
