# ThreatLab 2.0 - Cybersecurity Education Platform

[![License](https://img.shields.io/badge/License-Educational-blue.svg)](LICENSE)
[![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)](https://python.org)
[![React](https://img.shields.io/badge/React-18+-blue.svg)](https://reactjs.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-green.svg)](https://fastapi.tiangolo.com/)

A comprehensive cybersecurity learning platform featuring malware analysis and network reconnaissance tools with both FREE and premium capabilities.

## 🚀 Quick Start

### Prerequisites
- **Node.js 16+** and npm
- **Python 3.8+**
- **Git**

### Installation & Setup

```bash
# 1. Clone the repository
git clone https://github.com/HuzHacker123/ThreatLab.git
cd ThreatLab

# 2. Install frontend dependencies
npm install

# 3. Setup backend
cd backend
pip install -r requirements.txt
cp .env.example .env

# 4. Start the application
# Terminal 1 - Backend
python main.py

# Terminal 2 - Frontend
cd .. && npm run dev

# 5. Open browser
# http://localhost:5174
```

**That's it!** ThreatLab works immediately with FREE features.

## 🛠️ Features

### 🔍 Network Scanner

#### FREE Features (No API Keys Required)
- ✅ **IP Geolocation** - Geographic location, ISP, and organization data
- ✅ **DNS Resolution** - Domain to IP lookups with A, AAAA, MX, NS records
- ✅ **SSL Certificate Analysis** - Certificate validation and security details
- ✅ **No Setup Required** - Works immediately out of the box

#### Premium Features (Shodan API - $49/month)
- ✅ **Advanced Port Scanning** - Open ports and service detection
- ✅ **Vulnerability Assessment** - Security vulnerability data
- ✅ **CIDR Range Scanning** - Subnet and network reconnaissance
- ✅ **Historical Scan Data** - Device and service history

### 🛡️ Malware Scanner

#### FREE Features (No API Keys Required)
- ✅ **File Hash Calculation** - MD5, SHA-1, SHA-256
- ✅ **Basic File Analysis** - File type and metadata

#### Premium Features (VirusTotal API - Free tier available)
- ✅ **90+ Antivirus Engines** - Comprehensive malware detection
- ✅ **Real-time Analysis** - Instant threat assessment
- ✅ **Detailed Reports** - Comprehensive security analysis

## 📊 Feature Comparison

| Feature | FREE | Premium (Shodan) | Premium (VirusTotal) |
|---------|------|------------------|---------------------|
| IP Geolocation | ✅ | ✅ | - |
| DNS Lookup | ✅ | ✅ | - |
| SSL Analysis | ✅ | ✅ | - |
| Port Scanning | ❌ | ✅ | - |
| Service Detection | ❌ | ✅ | - |
| Vulnerability Data | ❌ | ✅ | - |
| Malware Scanning | Basic | - | ✅ Full |
| Setup Required | None | API Key | API Key |
| Rate Limits | 1000/day | 100-1000/month | 500/day (free) |

## 🔑 API Configuration (Optional)

### VirusTotal API (Malware Scanner)
```bash
# 1. Visit: https://www.virustotal.com/
# 2. Create free account
# 3. Get API key from profile settings
# 4. Add to backend/.env
VIRUSTOTAL_API_KEY=your_virustotal_key_here
```

### Shodan API (Network Scanner - Optional)
```bash
# 1. Visit: https://www.shodan.io/member
# 2. Choose plan ($49/month basic)
# 3. Get API key from account settings
# 4. Add to backend/.env
SHODAN_API_KEY=your_shodan_key_here
```

## 🎮 Using ThreatLab

### Network Scanner
1. Open http://localhost:5174
2. Navigate to **Network Scanner**
3. Choose scan type:
   - **Host Information** - IP geolocation (FREE)
   - **DNS Lookup** - Domain resolution (FREE)
   - **SSL Analysis** - Certificate check (FREE)
4. Enter target (IP or domain)
5. Click **"Start Scan"**

### Malware Scanner
1. Open http://localhost:5174
2. Navigate to **Malware Scanner**
3. Upload suspicious file
4. View analysis results

## 📝 Safe Testing Targets

### Public Services (Safe to scan):
- `8.8.8.8` - Google Public DNS
- `1.1.1.1` - Cloudflare DNS
- `google.com` - Popular domain
- `github.com` - Development platform

### Your Network (With Permission):
- Router IP (usually `192.168.1.1`)
- ISP gateway
- Authorized lab networks

## ⚖️ Legal & Ethical Guidelines

### ✅ AUTHORIZED USE:
- Educational learning and research
- Your own home network
- Authorized lab/testing environments
- Systems with written permission
- Professional penetration testing

### ❌ PROHIBITED:
- Unauthorized network scanning
- Government or critical infrastructure
- Any systems without explicit permission
- Illegal activities or violations

**⚠️ Always obtain written permission before scanning any network or system!**

## 🏗️ Architecture

```
┌─────────────────┐    HTTP    ┌─────────────────┐
│  React Frontend │◄──────────►│  FastAPI Backend│
│    (Vite)       │            │    (Python)     │
│                 │            │                 │
│ • Network Tools │            │ • FREE Scanners │
│ • Malware Tools │            │ • API Clients   │
│ • UI/UX         │            │ • Data Processing│
└─────────────────┘            └─────────┬───────┘
                                        │ HTTPS
                                        ▼
                         ┌──────────────────────┐
                         │   External Services   │
                         │ • ip-api.com (FREE)   │
                         │ • VirusTotal (FREE)   │
                         │ • Shodan (Optional)   │
                         └──────────────────────┘
```

## 🔧 API Endpoints

### Network Scanning
```bash
POST /api/scan
{
  "target": "8.8.8.8",
  "scan_type": "host"
}
```

### Malware Scanning
```bash
POST /api/malware-scan
# Multipart file upload
```

### Health Check
```bash
GET /
# Returns API status
```

## 🐛 Troubleshooting

### Backend Won't Start
```bash
# Kill existing process
lsof -ti:8000 | xargs kill -9

# Start backend
cd backend && python main.py
```

### Frontend Issues
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### FREE Scans Not Working
- Check internet connection
- Verify target is valid IP/domain
- Some targets may not have public data

### Premium Features Not Available
- Verify API keys in `backend/.env`
- Check account credits/limits
- Restart backend after key changes

## 📚 Learning Resources

- [**OWASP**](https://owasp.org/) - Web application security
- [**NIST Cybersecurity**](https://www.nist.gov/cyberframework)
- [**SANS Institute**](https://www.sans.org/) - Security training
- [**Cybrary**](https://www.cybrary.it/) - Free courses
- [**HackTheBox**](https://www.hackthebox.com/) - Practice labs

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature-name`
3. Make changes and test thoroughly
4. Commit: `git commit -m "Add feature"`
5. Push: `git push origin feature-name`
6. Submit pull request

## 📄 Project Structure

```
ThreatLab/
├── src/                    # React frontend
│   ├── components/        # Reusable components
│   ├── pages/            # Application pages
│   └── contexts/         # React contexts
├── backend/               # FastAPI backend
│   ├── main.py          # API server
│   ├── requirements.txt # Python dependencies
│   └── .env             # Environment variables
├── public/               # Static assets
├── package.json         # Node dependencies
└── README.md           # This file
```

## ⚠️ Disclaimer

**Educational Purpose Only**

This tool is provided as-is for cybersecurity education and research. Users are solely responsible for their actions and compliance with applicable laws and regulations.

- Never scan systems without explicit permission
- Respect privacy and legal boundaries
- Use for learning and authorized security testing only
- Unauthorized access may violate laws (CFAA, GDPR, etc.)

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/HuzHacker123/ThreatLab/issues)
- **Discussions**: [GitHub Discussions](https://github.com/HuzHacker123/ThreatLab/discussions)
- **Documentation**: This README and inline code comments

## 🙏 Acknowledgments

- **FastAPI** - Modern Python web framework
- **React** - Frontend library
- **Vite** - Build tool
- **Tailwind CSS** - Styling framework
- **IP-API** - Free geolocation service
- **VirusTotal** - Malware analysis platform
- **Shodan** - Network scanning platform

---

**Built with ❤️ for cybersecurity education and ethical hacking practice**

**Remember: With great power comes great responsibility. Use ThreatLab ethically!** 🛡️🔒</content>
<parameter name="filePath">/Users/huzefa/CodeWithHuzefa/ThreatLab 2.0/threatlab/README.md