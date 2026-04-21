from fastapi import FastAPI, HTTPException, BackgroundTasks, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import httpx
import os
from dotenv import load_dotenv
import logging
import hashlib

load_dotenv()

# Initialize FastAPI app
app = FastAPI(title="ThreatLab Security Tools API", version="1.0.0")

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
VIRUSTOTAL_API_KEY = os.getenv("VIRUSTOTAL_API_KEY", "")
VIRUSTOTAL_BASE_URL = "https://www.virustotal.com/api/v3"

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
                elif response.status_code in [401, 403]:
                    # Handle insufficient credits
                    return {
                        "error": "Shodan host lookup requires query credits",
                        "message": "Your Shodan account has no query credits remaining. Please upgrade your account or wait for credits to reset.",
                        "upgrade_url": "https://www.shodan.io/member"
                    }
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
                elif response.status_code in [401, 403]:
                    # Handle insufficient credits or membership requirements
                    return {
                        "error": "Shodan DNS lookup requires a paid membership",
                        "message": "Free accounts don't have DNS lookup credits. Please upgrade your Shodan account.",
                        "upgrade_url": "https://www.shodan.io/member"
                    }
                else:
                    raise HTTPException(status_code=response.status_code, detail="DNS lookup failed")
        except Exception as e:
            logger.error(f"DNS lookup error: {str(e)}")
            raise HTTPException(status_code=500, detail=f"Error resolving DNS: {str(e)}")

# Initialize Shodan client
if not SHODAN_API_KEY:
    logger.warning("SHODAN_API_KEY not set in environment variables")

shodan_client = ShodanClient(SHODAN_API_KEY)

# VirusTotal API Client
class VirusTotalClient:
    def __init__(self, api_key: str):
        self.api_key = api_key
        self.base_url = VIRUSTOTAL_BASE_URL
        self.headers = {
            "x-apikey": api_key
        }
    
    def calculate_file_hashes(self, file_content: bytes) -> dict:
        """Calculate MD5, SHA-1, and SHA-256 hashes for file content"""
        return {
            "md5": hashlib.md5(file_content).hexdigest(),
            "sha1": hashlib.sha1(file_content).hexdigest(),
            "sha256": hashlib.sha256(file_content).hexdigest()
        }
    
    async def scan_file(self, file_content: bytes, filename: str) -> dict:
        """Upload and scan a file with VirusTotal"""
        try:
            async with httpx.AsyncClient(timeout=60) as client:
                files = {"file": (filename, file_content)}
                response = await client.post(
                    f"{self.base_url}/files",
                    files=files,
                    headers=self.headers
                )
                
                if response.status_code == 200:
                    analysis_data = response.json()
                    analysis_id = analysis_data["data"]["id"]
                    
                    # Get detailed analysis results
                    analysis_results = await self.get_analysis(analysis_id)
                    return analysis_results
                else:
                    raise HTTPException(status_code=response.status_code, detail=f"VirusTotal upload failed: {response.text}")
        except Exception as e:
            logger.error(f"VirusTotal file scan error: {str(e)}")
            raise HTTPException(status_code=500, detail=f"Error scanning file: {str(e)}")
    
    async def get_analysis(self, analysis_id: str) -> dict:
        """Get detailed analysis results"""
        try:
            async with httpx.AsyncClient(timeout=30) as client:
                response = await client.get(
                    f"{self.base_url}/analyses/{analysis_id}",
                    headers=self.headers
                )
                
                if response.status_code == 200:
                    return response.json()
                else:
                    raise HTTPException(status_code=response.status_code, detail="Failed to get analysis")
        except Exception as e:
            logger.error(f"VirusTotal analysis error: {str(e)}")
            raise HTTPException(status_code=500, detail=f"Error getting analysis: {str(e)}")
    
    async def get_file_info(self, file_hash: str) -> dict:
        """Get information about a file by hash (MD5, SHA-1, or SHA-256)"""
        try:
            async with httpx.AsyncClient(timeout=30) as client:
                response = await client.get(
                    f"{self.base_url}/files/{file_hash}",
                    headers=self.headers
                )
                
                if response.status_code == 200:
                    return response.json()
                else:
                    raise HTTPException(status_code=response.status_code, detail="File not found in database")
        except Exception as e:
            logger.error(f"VirusTotal file info error: {str(e)}")
            raise HTTPException(status_code=500, detail=f"Error getting file info: {str(e)}")

# Initialize VirusTotal client
if not VIRUSTOTAL_API_KEY:
    logger.warning("VIRUSTOTAL_API_KEY not set in environment variables")

virustotal_client = VirusTotalClient(VIRUSTOTAL_API_KEY)

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

@app.post("/api/malware-scan")
async def scan_malware(file: UploadFile = File(...)):
    """
    Scan a file for malware using VirusTotal API
    Returns detailed analysis with engine detections
    """
    try:
        if not VIRUSTOTAL_API_KEY:
            raise HTTPException(status_code=500, detail="VirusTotal API key not configured")
        
        # Read file content
        content = await file.read()
        
        # Validate file size (100MB limit for VirusTotal API)
        max_size = 100 * 1024 * 1024
        if len(content) > max_size:
            raise HTTPException(
                status_code=400, 
                detail=f"File size exceeds 100MB limit. Uploaded file is {len(content) / 1024 / 1024:.1f}MB"
            )
        
        # Calculate file hashes
        hashes = virustotal_client.calculate_file_hashes(content)
        
        logger.info(f"Scanning file: {file.filename} (SHA256: {hashes['sha256']})")
        
        # Scan the file
        analysis_results = await virustotal_client.scan_file(content, file.filename)
        
        # Extract relevant data
        attributes = analysis_results.get("data", {}).get("attributes", {})
        stats = attributes.get("stats", {})
        results = attributes.get("results", {})
        
        # Count detections
        malicious_count = stats.get("malicious", 0)
        suspicious_count = stats.get("suspicious", 0)
        undetected_count = stats.get("undetected", 0)
        harmless_count = stats.get("harmless", 0)
        
        # Determine verdict
        if malicious_count > 0:
            verdict = "malicious"
        elif suspicious_count > 0:
            verdict = "suspicious"
        elif harmless_count > 0 and undetected_count == 0:
            verdict = "clean"
        else:
            verdict = "unknown"
        
        # Format engine detections
        engine_detections = []
        for engine_name, engine_result in results.items():
            if engine_result.get("category") != "undetected":
                engine_detections.append({
                    "engine": engine_name,
                    "category": engine_result.get("category", "unknown"),
                    "engine_name": engine_result.get("engine_name", ""),
                    "result": engine_result.get("result", "")
                })
        
        # Sort detections by engine name
        engine_detections.sort(key=lambda x: x["engine"])
        
        return {
            "success": True,
            "data": {
                "fileName": file.filename,
                "fileSize": len(content),
                "hashes": hashes,
                "scanDate": attributes.get("last_analysis_date", ""),
                "verdict": verdict,
                "stats": {
                    "malicious": malicious_count,
                    "suspicious": suspicious_count,
                    "undetected": undetected_count,
                    "harmless": harmless_count,
                    "total": malicious_count + suspicious_count + undetected_count + harmless_count
                },
                "detections": engine_detections,
                "analysisId": analysis_results.get("data", {}).get("id", "")
            }
        }
    
    except HTTPException as e:
        logger.error(f"HTTP Error: {e.detail}")
        return {"success": False, "error": str(e.detail)}
    except Exception as e:
        logger.error(f"Malware scan error: {str(e)}")
        return {"success": False, "error": f"An error occurred during scanning: {str(e)}"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
