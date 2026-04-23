from fastapi import FastAPI, HTTPException, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import httpx
import os
from dotenv import load_dotenv
import logging
import hashlib
import socket
import ssl
import ipaddress
import asyncio
from datetime import datetime, timezone

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

class LocalScanner:
    """Local network intelligence scanner (no paid external API required)."""

    COMMON_PORTS = [21, 22, 23, 25, 53, 80, 110, 123, 135, 139, 143, 443, 445, 3306, 3389, 5432, 6379, 8080, 8443]
    SERVICE_MAP = {
        21: "ftp",
        22: "ssh",
        23: "telnet",
        25: "smtp",
        53: "dns",
        80: "http",
        110: "pop3",
        123: "ntp",
        135: "msrpc",
        139: "netbios",
        143: "imap",
        443: "https",
        445: "smb",
        3306: "mysql",
        3389: "rdp",
        5432: "postgresql",
        6379: "redis",
        8080: "http-alt",
        8443: "https-alt",
    }

    @staticmethod
    def is_ip_address(value: str) -> bool:
        try:
            ipaddress.ip_address(value)
            return True
        except ValueError:
            return False

    async def resolve_domain(self, domain: str) -> dict:
        try:
            addrinfo = await asyncio.to_thread(socket.getaddrinfo, domain, None)
            ipv4_records = sorted({item[4][0] for item in addrinfo if item[0] == socket.AF_INET})
            ipv6_records = sorted({item[4][0] for item in addrinfo if item[0] == socket.AF_INET6})
            return {
                "A": ipv4_records,
                "AAAA": ipv6_records,
            }
        except Exception as e:
            raise HTTPException(status_code=400, detail=f"DNS resolution failed: {str(e)}")

    async def _is_port_open(self, ip: str, port: int, timeout: float = 0.7) -> bool:
        try:
            conn = asyncio.open_connection(ip, port)
            reader, writer = await asyncio.wait_for(conn, timeout=timeout)
            writer.close()
            await writer.wait_closed()
            return True
        except Exception:
            return False

    async def scan_open_ports(self, ip: str) -> list:
        tasks = [self._is_port_open(ip, port) for port in self.COMMON_PORTS]
        results = await asyncio.gather(*tasks)
        return [port for port, is_open in zip(self.COMMON_PORTS, results) if is_open]

    async def get_host_info(self, target: str) -> dict:
        is_domain = not self.is_ip_address(target)

        if is_domain:
            dns_data = await self.resolve_domain(target)
            if not dns_data.get("A"):
                raise HTTPException(status_code=400, detail="No IPv4 address found for this domain")
            ip = dns_data["A"][0]
            hostnames = [target]
        else:
            ip = target
            try:
                reverse = await asyncio.to_thread(socket.gethostbyaddr, ip)
                hostnames = [reverse[0], *reverse[1]]
            except Exception:
                hostnames = []

        open_ports = await self.scan_open_ports(ip)
        services = [
            {
                "port": port,
                "service": self.SERVICE_MAP.get(port, "unknown"),
                "banner": "Service detected via TCP connect scan",
            }
            for port in open_ports
        ]

        return {
            "ip": ip,
            "ip_str": ip,
            "hostnames": hostnames,
            "ports": open_ports,
            "data": services,
            "source": "local-scanner",
        }

    async def get_ssl_info(self, target: str, port: int = 443) -> dict:
        def _fetch_cert(host: str, tls_port: int):
            context = ssl.create_default_context()
            with socket.create_connection((host, tls_port), timeout=5) as sock:
                with context.wrap_socket(sock, server_hostname=host) as ssock:
                    return ssock.getpeercert()

        try:
            cert = await asyncio.to_thread(_fetch_cert, target, port)
            return {
                "subject": cert.get("subject", []),
                "issuer": cert.get("issuer", []),
                "version": cert.get("version"),
                "serial_number": cert.get("serialNumber"),
                "not_before": cert.get("notBefore"),
                "not_after": cert.get("notAfter"),
                "subject_alt_names": cert.get("subjectAltName", []),
                "scanned_at": datetime.now(timezone.utc).isoformat(),
                "source": "local-scanner",
            }
        except Exception as e:
            raise HTTPException(status_code=400, detail=f"SSL analysis failed: {str(e)}")


local_scanner = LocalScanner()

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
    Supports: IP addresses and domain names
    """
    try:
        target = request.target.strip()
        scan_type = request.scan_type.lower()
        
        if not target:
            raise HTTPException(status_code=400, detail="Target cannot be empty")
        
        # CIDR scanning is intentionally disabled in local mode to avoid broad, potentially abusive scans.
        if "/" in target:
            raise HTTPException(status_code=400, detail="CIDR range scanning is not supported in this local scanner")

        is_domain = not local_scanner.is_ip_address(target)
        result_data = {}

        if scan_type == "dns":
            if not is_domain:
                raise HTTPException(status_code=400, detail="DNS lookup requires a domain target")
            logger.info(f"Resolving DNS for domain: {target}")
            result_data["dns"] = await local_scanner.resolve_domain(target)

        elif scan_type == "ssl":
            logger.info(f"Running SSL analysis for target: {target}")
            result_data["ssl"] = await local_scanner.get_ssl_info(target)

        else:
            logger.info(f"Running host scan for target: {target}")
            if is_domain:
                result_data["dns"] = await local_scanner.resolve_domain(target)
            host_info = await local_scanner.get_host_info(target)
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
    """Get detailed local scanner information about a specific host"""
    try:
        target = request.target.strip()

        if not target:
            raise HTTPException(status_code=400, detail="Target cannot be empty")

        if "/" in target:
            raise HTTPException(status_code=400, detail="CIDR range scanning is not supported in this endpoint")

        host_info = await local_scanner.get_host_info(target)
        
        return ScanResult(
            success=True,
            data={
                "target": target,
                "host_info": host_info
            }
        )
    except Exception as e:
        logger.error(f"Error: {str(e)}")
        return ScanResult(success=False, error=str(e))

@app.get("/api/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "local_scanner": True,
        "virustotal_configured": bool(VIRUSTOTAL_API_KEY),
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
