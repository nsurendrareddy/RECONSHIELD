from contextlib import asynccontextmanager
from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from slowapi import _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded
import os
import sys

# Ensure the server directory is in the path for module resolution
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
if BASE_DIR not in sys.path:
    sys.path.insert(0, BASE_DIR)

from config import settings
from routes.scan import router as scan_router
from routes.contact import router as contact_router

from utils.logger import logger
from middleware.rate_limiter import limiter

# Ensure required directories exist at startup
# This must happen BEFORE app.mount() calls
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
UPLOAD_DIR = os.path.join(BASE_DIR, "uploads")
if not os.path.exists(UPLOAD_DIR):
    os.makedirs(UPLOAD_DIR, exist_ok=True)
    # Also create subdirectories if needed
    os.makedirs(os.path.join(UPLOAD_DIR, "blog"), exist_ok=True)

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Startup and shutdown events (Database-Less Mode)."""
    from db.store import init_db
    await init_db()
    logger.info(f"ReconShield API initializing in {settings.ENV} mode (Sanity.io Powered)")
    yield
    logger.info("ReconShield API shutting down")

app = FastAPI(
    title="ReconShield API",
    description="Ethical Intelligence & Security Analyzer",
    version="2.0.0",
    lifespan=lifespan,
)

# Rate limiter
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# CORS
frontend_url = settings.FRONTEND_URL
allowed_origins = [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://reconshield.in",
    "https://www.reconshield.in",
    frontend_url.rstrip("/") if frontend_url else None
]

allowed_origins = list(set([o for o in allowed_origins if o]))

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_origin_regex=r"https://.*\.vercel\.app",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["Content-Disposition"],
)

@app.middleware("http")
async def log_requests(request: Request, call_next):
    client_host = request.client.host if request.client else "unknown"
    logger.info(f"{request.method} {request.url.path} from {client_host}")
    response = await call_next(request)
    return response

@app.get("/")
async def root():
    return {
        "message": "ReconShield API is running",
        "version": "2.0.0",
        "mode": "Database-Less (Sanity.io Powered)",
        "docs": "/docs",
        "health": "/api/health"
    }

@app.get("/api/health")
async def health_check():
    return {
        "status": "ok",
        "version": "2.0.0",
        "database": "none (stateless)"
    }

# Mount routers
app.include_router(scan_router, prefix="/api/scan", tags=["Scan"])
app.include_router(contact_router, prefix="/api/contact", tags=["Contact"])
app.mount("/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")

from pydantic import BaseModel
import asyncio
from services.ip_intel import ip_intelligence
from services.dns_service import dns_lookup
from services.ssl_service import ssl_analysis
from services.port_check import port_check

class IpScanRequest(BaseModel):
    target: str

@app.post("/api/ip-scanner")
@limiter.limit("20/minute")
async def api_ip_scanner(request: Request, body: IpScanRequest):
    domain = body.target
    
    # Run core IP/Domain reconnaissance concurrently
    results = await asyncio.gather(
        ip_intelligence(domain),
        dns_lookup(domain),
        ssl_analysis(domain),
        port_check(domain),
        return_exceptions=True
    )
    
    ip_data = results[0] if not isinstance(results[0], Exception) else {}
    dns_data = results[1] if not isinstance(results[1], Exception) else {}
    ssl_data = results[2] if not isinstance(results[2], Exception) else {}
    port_data = results[3] if not isinstance(results[3], Exception) else {}

    # Format exactly to what IpScannerClient.jsx expects
    return {
        "risk_score": {
            "score": ip_data.get("abuse_score", 0),
            "level": ip_data.get("risk_level", "Low")
        },
        "ip_info": {
            "ip": ip_data.get("ip", domain),
            "lat": ip_data.get("lat"),
            "lon": ip_data.get("lon"),
            "city": ip_data.get("city", "Unknown"),
            "country": ip_data.get("country", "Unknown"),
            "isp": ip_data.get("isp", "Unknown"),
            "org": ip_data.get("org", "Unknown"),
            "asn": ip_data.get("as_number", "Unknown"),
            "as_name": ip_data.get("as_name", "Unknown")
        },
        "ssl": {
            "grade": ssl_data.get("grade", "N/A") if isinstance(ssl_data, dict) else "N/A"
        },
        "ports": {
            "open_count": len(port_data.get("open_ports", [])) if isinstance(port_data, dict) else 0
        },
        "dns_info": {
            "reverse_dns": dns_data.get("reverse_dns", []),
            "spf": dns_data.get("spf", {"found": False, "status": "fail"}),
            "dmarc": dns_data.get("dmarc", {"found": False, "status": "fail"})
        },
        "recommendations": ip_data.get("issues", []) + dns_data.get("issues", [])
    }

if __name__ == "__main__":
    import uvicorn
    # Use reload=False for production readiness if run directly
    uvicorn.run("app:app", host="0.0.0.0", port=settings.PORT, reload=(settings.ENV == "development"))
