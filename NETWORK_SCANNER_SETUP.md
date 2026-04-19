# Advanced Network Scanner Setup Guide

This guide walks you through setting up the Advanced Network Scanner with Shodan API integration.

## Architecture Overview

```
┌─────────────────────────────────┐
│   React Frontend (Vite)         │
│   NetworkScanner.tsx            │
└──────────────┬──────────────────┘
               │ HTTP Requests
               ↓
┌─────────────────────────────────┐
│   FastAPI Backend (Python)      │
│   main.py (port 8000)           │
└──────────────┬──────────────────┘
               │ HTTPS Requests
               ↓
┌─────────────────────────────────┐
│   Shodan API                    │
│   (api.shodan.io)               │
└─────────────────────────────────┘
```

## Step-by-Step Setup

### Prerequisites

- Python 3.8 or higher
- Node.js and npm (for React frontend)
- A Shodan account with API key (free tier available at shodan.io)

### Part 1: Frontend Setup (React/Vite)

Your React frontend is already configured. The Vite development server will run on **http://localhost:5173**.

### Part 2: Backend Setup (FastAPI)

#### Step 1: Navigate to Backend Directory

```bash
cd backend
```

#### Step 2: Create Virtual Environment

**macOS/Linux:**
```bash
python3 -m venv venv
source venv/bin/activate
```

**Windows:**
```bash
python -m venv venv
venv\Scripts\activate
```

#### Step 3: Install Python Dependencies

```bash
pip install -r requirements.txt
```

This will install:
- `fastapi` - Web framework
- `uvicorn` - ASGI server
- `httpx` - Async HTTP client
- `python-dotenv` - Environment variable management
- `pydantic` - Data validation

#### Step 4: Configure Shodan API Key

1. Copy the example environment file:
```bash
cp .env.example .env
```

2. Edit the `.env` file and add your Shodan API key:
```bash
SHODAN_API_KEY=your_actual_api_key_here
```

**How to get a Shodan API key:**
1. Go to https://www.shodan.io/
2. Click "Sign Up" and create a free account
3. Log in to your account
4. Click on your profile icon → Account settings
5. Find the API key section and copy your key
6. Paste it into the `.env` file

#### Step 5: Start the Backend Server

```bash
python main.py
```

You should see output like:
```
INFO:     Started server process [12345]
INFO:     Waiting for application startup.
INFO:     Application startup complete
INFO:     Uvicorn running on http://:8000 (Press CTRL+C to quit)
```

**Verify it's working:**
```bash
curl http://localhost:8000/
```

Should return:
```json
{
  "status": "ok",
  "service": "ThreatLab Network Scanner API",
  "version": "1.0.0"
}
```

### Part 3: Running Both Services

You need **two terminal windows** to run the app.

#### Terminal 1 - Backend (Python)

```bash
cd backend
source venv/bin/activate  # or: venv\Scripts\activate on Windows
python main.py
```

Keep this running (http://localhost:8000)

#### Terminal 2 - Frontend (React)

```bash
npm run dev
```

This will start the Vite dev server (http://localhost:5173)

## Using the Scanner

1. Open http://localhost:5173 in your browser
2. Navigate to the Network Scanner tool
3. You'll see the configuration panel on the left
4. Click "Configure" to enter your Shodan API key
5. Enter your target (IP address, domain, or CIDR range)
6. Select scan type
7. Read and accept the legal warnings (required!)
8. Click "Start Scan"

## Scan Types

### Host Information
- Detailed IP/host analysis
- Open ports discovery
- Running services identification
- Geographic and ISP information
- Vulnerability detection

### DNS Lookup
- Domain to IP resolution
- DNS record retrieval
- MX, A, AAAA records
- Reverse DNS lookups

### SSL/TLS Analysis
- Certificate information
- SSL/TLS version detection
- Cipher suite analysis
- Certificate chain validation

## Example Targets to Scan

**For Learning (Public Information):**
- `8.8.8.8` (Google DNS - well-known public server)
- `1.1.1.1` (Cloudflare DNS)
- `google.com` (Popular domain)

**For Home Network (With Permission):**
- Your router IP (e.g., `192.168.1.1`)
- Your ISP gateway
- Your own devices on local network

⚠️ **Remember:** Always ensure you have written permission before scanning any network!

## Troubleshooting

### Backend Won't Start

**Error: "Address already in use"**
- Another process is using port 8000
- Kill the process: `lsof -i :8000` then `kill -9 <PID>`
- Or change port in `main.py`: `uvicorn.run(app, host="127.0.0.1", port=8001)`

**Error: "Module not found"**
- Make sure virtual environment is activated
- Run `pip install -r requirements.txt` again

### Frontend Can't Connect

**Error: "Failed to connect to backend"**
- Make sure backend is running on port 8000
- Check CORS settings in backend
- Verify API URL in NetworkScanner.tsx

**Error: "Shodan API key not configured"**
- Check `.env` file exists in backend directory
- Verify API key format is correct
- Restart backend after changing `.env`

### Scanner Returns No Results

**Error: "Failed to fetch from Shodan"**
- Verify Shodan API key is valid
- Check your Shodan account has credits/quota
- Try a different target
- Check API rate limits (Shodan has limits on free tier)

## API Reference

### POST /api/scan

Main endpoint for network scanning.

**Request:**
```json
{
  "target": "192.168.1.1",
  "scan_type": "host"
}
```

**Parameters:**
- `target` (string, required): IP address, domain, or CIDR range
- `scan_type` (string, optional): "host", "dns", or "ssl" (default: "host")

**Response:**
```json
{
  "success": true,
  "data": {
    "target": "192.168.1.1",
    "scan_type": "host",
    "results": {
      "host": {
        "ip_str": "192.168.1.1",
        "ports": [22, 80, 443],
        "country_name": "United States",
        "org": "ISP Name",
        "data": [...]
      }
    }
  }
}
```

## Production Considerations

When deploying to production:

1. **Use HTTPS** - Replace HTTP with HTTPS
2. **Secure API Keys** - Use AWS Secrets Manager, environment variables, or vaults
3. **Rate Limiting** - Implement rate limiting to prevent abuse
4. **Authentication** - Add authentication to the backend
5. **Logging** - Set up proper logging and monitoring
6. **CORS** - Restrict CORS to your domain only
7. **Error Handling** - Return generic errors (don't leak system info)
8. **Deployment** - Use production ASGI server like Gunicorn

Example production start:
```bash
gunicorn -w 4 -k uvicorn.workers.UvicornWorker main:app
```

## Legal Compliance

⚠️ **This tool is for educational purposes only.**

- **You are responsible** for your use of this tool
- **Only scan networks you own or have explicit written permission to scan**
- **Unauthorized access to computer systems is illegal** (CFAA in US, similar laws elsewhere)
- **Violators face criminal penalties** including imprisonment and substantial fines

## Resources

- [Shodan API Docs](https://developer.shodan.io/)
- [FastAPI Docs](https://fastapi.tiangolo.com/)
- [Network Security](https://www.nist.gov/cybersecurity)
- [Legal Security Testing](https://www.nist.gov/publications/guide-conducting-penetration-tests)

## Next Steps

1. Set up both frontend and backend ✓
2. Configure Shodan API key ✓
3. Test with a simple scan ✓
4. Review scan results
5. Learn about network security
6. Consider advanced features (persistence, reporting, etc.)

---

**Version:** 1.0.0  
**Last Updated:** April 2026  
**Status:** Production Ready
