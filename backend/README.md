# ThreatLab Advanced Network Scanner Backend

Enterprise-grade network reconnaissance backend powered by **Shodan API**.

## Overview

This FastAPI backend serves as the proxy for the ThreatLab Network Scanner. It securely handles Shodan API requests without exposing your API key to the frontend.

### Features

✓ **Shodan API Integration** - Leverage Shodan's massive internet scan database
✓ **Multiple Scan Types** - Host information, DNS lookup, SSL/TLS analysis
✓ **CIDR Range Support** - Scan entire subnets and IP ranges
✓ **Async Processing** - Fast, non-blocking API requests
✓ **CORS Enabled** - Works with your React frontend
✓ **Error Handling** - Comprehensive error messages and logging

## Requirements

- Python 3.8+
- pip (Python package manager)

## Installation

### 1. Create Virtual Environment (Recommended)

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Configure Shodan API Key

```bash
cp .env.example .env
```

Edit the `.env` file and add your Shodan API key:

```
SHODAN_API_KEY=your_shodan_api_key_here
```

**Getting a Shodan API Key:**
1. Visit https://www.shodan.io/
2. Create a free account
3. Navigate to your account settings
4. Copy your API key
5. Paste it in the `.env` file

## Running the Server

```bash
python main.py
```

The API will be available at: **http://localhost:8000**

### Health Check

```bash
curl http://localhost:8000/
```

## API Endpoints

### POST `/api/scan`

Perform a network scan on a target (IP, domain, or CIDR range).

**Request:**
```json
{
  "target": "192.168.1.1",
  "scan_type": "host"
}
```

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
        "org": "Example ISP",
        "data": [...]
      }
    }
  }
}
```

### POST `/api/host-info`

Get detailed information about a specific IP address.

### POST `/api/search`

Search Shodan with a custom query.

### GET `/api/health`

Health check endpoint.

## Environment Variables

```
SHODAN_API_KEY       - Your Shodan API key (required)
```

## Frontend Integration

The React frontend at `src/pages/tools/NetworkScanner.tsx` connects to this backend.

**Important:** Make sure the backend is running before using the scanner in the frontend.

### Frontend Configuration

The frontend expects the backend to be running at:
```
http://localhost:8000
```

If you need to run the backend on a different port, update the `API_BASE_URL` in NetworkScanner.tsx:

```typescript
const API_BASE_URL = 'http://localhost:YOUR_PORT/api';
```

## Troubleshooting

### "Connection refused" error

- Make sure the backend is running: `python main.py`
- Check that port 8000 is not in use
- Verify the frontend is connecting to the correct URL

### "SHODAN_API_KEY not configured" error

- Check that your `.env` file exists
- Verify your API key is correctly set in `.env`
- Restart the backend after changing `.env`

### "Failed to fetch from Shodan" error

- Verify your Shodan API key is valid
- Check your Shodan account quota/credits
- Ensure your target is a valid IP address or domain

## Security Notes

⚠️ **IMPORTANT:**

1. **Never commit `.env` file** to version control
2. **Never expose your API key** in the frontend
3. **Always use HTTPS** in production
4. **Validate user input** on both frontend and backend
5. **Only scan authorized targets**

## Legal Compliance

Network scanning can be illegal without authorization. **Always ensure you have explicit written permission** before scanning any network or IP address.

### Legal Uses:
- Your own home network
- Systems with written authorization
- Lab/testing environments
- Authorized penetration testing engagements

### Illegal Uses:
- Unauthorized network scanning
- Scanning without permission
- Government/critical infrastructure attacks
- Violating the Computer Fraud and Abuse Act (CFAA)

## Development

### Project Structure

```
backend/
├── main.py              # FastAPI application
├── requirements.txt     # Python dependencies
├── .env.example         # Example environment file
└── README.md            # This file
```

### Adding New Endpoints

Edit `main.py` and add new routes:

```python
@app.post("/api/your-endpoint")
async def your_endpoint(request: ScanRequest):
    # Your code here
    return ScanResult(success=True, data=...)
```

### Logging

The application logs requests and errors to help with debugging:

```python
logger.info(f"Scanning target: {target}")
logger.error(f"Error: {str(e)}")
```

## Performance Tips

- **Limit concurrent requests** to avoid rate limiting
- **Cache results** for frequently scanned targets
- **Use CIDR ranges carefully** - large ranges may use significant quota
- **Monitor API usage** on your Shodan account dashboard

## Resources

- [Shodan API Documentation](https://developer.shodan.io/)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Network Security Best Practices](https://www.nist.gov/)

## License

This software is provided for educational purposes only. Use responsibly and legally.

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Verify your Shodan API key and configuration
3. Review the API logs for error details
4. Ensure your target is accessible and valid

---

**Last Updated:** April 2026
**Version:** 1.0.0
