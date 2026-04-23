# ThreatLab

ThreatLab is an educational cybersecurity platform built to help learners explore security concepts through hands-on, browser-based tools and safe simulations.

It includes a modern React frontend and a FastAPI backend that powers network intelligence and malware analysis features.

---

## ✨ Features

ThreatLab includes interactive tools for:

- **Password Strength Testing**
- **Cipher & Cryptography Practice** (Caesar, Vigenère, RSA)
- **Phishing Awareness Simulation**
- **Network Scanning & Host Intelligence**
- **Malware File Scanning** (VirusTotal integration)
- **SQL Injection Demonstration** (safe learning environment)

Additional platform pages include:

- Home dashboard
- Tools overview
- Login / Register
- Admin panel
- About page

---

## 🧱 Tech Stack

### Frontend

- **React 18** + **TypeScript**
- **Vite**
- **Tailwind CSS**
- **React Router**
- **Lucide React** icons

### Backend

- **FastAPI**
- **Uvicorn**
- **httpx**
- **python-dotenv**
- Integrations with:
  - **VirusTotal API**

---

## 📁 Project Structure

```text
threatlab/
├── src/                  # Frontend app (React + TypeScript)
├── backend/              # FastAPI backend API
├── package.json          # Frontend scripts & dependencies
└── README.md
```

---

## 🚀 Getting Started

### 1) Clone the repository

```bash
git clone https://github.com/HuzHacker123/ThreatLab.git
cd ThreatLab
```

### 2) Frontend setup

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Frontend runs by default at: `http://localhost:5173`

### 3) Backend setup

Create and activate a Python virtual environment (recommended), then install dependencies:

```bash
cd backend
pip install -r requirements.txt
```

Copy environment file and add your API key:

```bash
cp .env.example .env
```

Set:

- `VIRUSTOTAL_API_KEY`

Run backend server:

```bash
python main.py
```

Backend runs at: `http://127.0.0.1:8000`

---

## 🔌 API Endpoints (Backend)

- `GET /` — root health/info
- `GET /api/health` — service health
- `POST /api/scan` — local scan (host, DNS, SSL)
- `POST /api/host-info` — detailed local host lookup
- `POST /api/malware-scan` — file malware scan via VirusTotal

---

## ⚠️ Important Notes

- ThreatLab is intended for **education and ethical security training only**.
- Malware scanning requires a valid VirusTotal API key and may be subject to rate limits.
- Do not use these tools against systems you do not own or explicitly have permission to test.

---

## 📜 License

This project is distributed under the terms in the [LICENSE](./LICENSE) file.

