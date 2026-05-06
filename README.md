# 🛡️ ReconShield – Ethical Intelligence & Security Analyzer

A production-ready cybersecurity reconnaissance platform combining passive OSINT, security analysis, and risk assessment into a professional-grade web application.

<p align="center">
  <strong>FastAPI Backend • React Frontend • AI Risk Engine</strong>
</p>

---

## ✨ Features

### 🌐 Domain Intelligence
- WHOIS lookup (registrar, dates, status)
- Domain age calculation & expiry monitoring
- DNSSEC status check

### 🌍 DNS & Infrastructure Mapping
- A, AAAA, MX, TXT, NS, CNAME, SOA records
- SPF/DMARC misconfiguration detection
- Cloud provider identification (AWS, Cloudflare, Azure, GCP)
- Reverse DNS lookup

### 🔐 SSL/TLS Analysis
- Certificate issuer, chain, and SANs
- Expiry countdown with warnings
- Protocol & cipher inspection
- HTTPS enforcement check

### 🛡️ Security Headers (A–F Grading)
- CSP, HSTS, X-Frame-Options, X-Content-Type-Options
- Referrer-Policy, Permissions-Policy, X-XSS-Protection
- Weighted scoring and letter grade

### 🚪 Port Exposure Assessment
- 13 common ports checked via safe TCP connect
- Service identification with risk classification
- No raw scanning — connection-based only

### 🧰 Technology Fingerprinting
- HTTP header analysis (Server, X-Powered-By)
- HTML pattern detection for 18+ technologies
- CMS, frameworks, CDN, analytics detection
- Version exposure warnings

### 📡 IP Intelligence
- Geolocation (country, region, city, coordinates)
- ASN, ISP, and organization lookup
- Hosting/datacenter and proxy/VPN detection

### 🔍 Passive Subdomain Enumeration
- Certificate Transparency logs via crt.sh
- Risky subdomain pattern flagging (dev, staging, admin)

### 🤖 AI Risk Engine
- Weighted risk score (0–100)
- Vulnerability detection with severity classification
- Prioritized remediation recommendations
- Overall letter grade (A–F)

### 🧰 Linux Tools Integration (Optional)
- Nmap (safe scan), Amass, theHarvester, WhatWeb, Nikto
- Auto-detected — only shows when tools are installed
- Safe command flags only

---

## 🚀 Quick Start

### Prerequisites
- Python 3.10+
- Node.js 18+ & npm

### 1. Clone & Setup
```bash
# Install Python dependencies
cd server
pip install -r requirements.txt

# Install frontend dependencies
cd ../client
npm install
```

### 2. Configure (Optional)
```bash
# Copy env template
cp .env.example .env

# Add optional API keys for enhanced results
# The app works fully without any API keys
```

### 3. Run
```bash
# Terminal 1: Start backend
cd server
python main.py

# Terminal 2: Start frontend
cd client
npm run dev
```

### 4. Open
Navigate to **http://localhost:5173**

---

## 📁 Project Structure

```
├── server/                     # FastAPI Backend (Python)
│   ├── main.py                 # App entry point
│   ├── config.py               # Configuration
│   ├── requirements.txt        # Python dependencies
│   ├── middleware/
│   │   ├── rate_limiter.py     # Rate limiting (SlowAPI)
│   │   └── validator.py        # Input validation (Pydantic)
│   ├── routes/
│   │   ├── scan.py             # POST/GET /api/scan
│   │   ├── history.py          # GET/DELETE /api/history
│   │   └── export.py           # GET /api/export/:id/json|pdf
│   ├── services/               # 9 analysis modules
│   │   ├── whois_service.py
│   │   ├── dns_service.py
│   │   ├── ssl_service.py
│   │   ├── headers_service.py
│   │   ├── port_check.py
│   │   ├── tech_detect.py
│   │   ├── ip_intel.py
│   │   ├── subdomains.py
│   │   └── linux_tools.py
│   ├── engine/
│   │   └── risk_engine.py      # AI Risk scoring
│   ├── db/
│   │   └── store.py            # SQLite (aiosqlite)
│   └── utils/
│       ├── logger.py
│       └── helpers.py
│
├── client/                     # React Frontend
│   ├── vite.config.js
│   ├── index.html
│   └── src/
│       ├── App.jsx
│       ├── index.css           # Tailwind v4 design system
│       ├── components/         # Reusable UI components
│       ├── sections/           # 10 dashboard sections
│       ├── pages/              # Dashboard & History
│       ├── hooks/              # useScan hook
│       └── utils/              # API client
│
├── .env.example
└── README.md
```

---

## 🔌 API Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/scan` | Start new scan `{domain, consent}` |
| `GET` | `/api/scan/:id` | Get full scan results |
| `GET` | `/api/scan/:id/status` | Poll scan status |
| `GET` | `/api/history` | List past scans |
| `DELETE` | `/api/history/:id` | Delete a scan |
| `GET` | `/api/export/:id/json` | Download JSON report |
| `GET` | `/api/export/:id/pdf` | Download PDF report |

---

## 🚢 Deployment

### Backend (Render / Railway / VPS)
```bash
cd server
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port $PORT
```

### Frontend (Vercel / Netlify)
```bash
cd client
npm run build
# Deploy the dist/ folder
# Set API proxy/rewrite to your backend URL
```

### Docker (Optional — enables Linux tools)
```dockerfile
FROM python:3.12-slim
WORKDIR /app
RUN apt-get update && apt-get install -y nmap amass
COPY server/ .
RUN pip install -r requirements.txt
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "3001"]
```

---

## 🔒 Security & Ethics

- **Consent Required**: Users must confirm authorization before scanning
- **Rate Limited**: 5 scans per 15 minutes per IP
- **Non-Intrusive**: Only passive techniques and safe TCP connects
- **No Exploitation**: No brute-force, fuzzing, or vulnerability exploitation
- **Input Sanitized**: All inputs validated and sanitized
- **Private IPs Blocked**: Cannot scan localhost or private ranges

---

## 📜 License

MIT — Use responsibly. Only scan assets you own or have permission to test.
