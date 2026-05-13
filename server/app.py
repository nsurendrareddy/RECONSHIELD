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
    frontend_url.rstrip("/") if frontend_url else None
]

allowed_origins = list(set([o for o in allowed_origins if o]))

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
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

if __name__ == "__main__":
    import uvicorn
    # Use reload=False for production readiness if run directly
    uvicorn.run("app:app", host="0.0.0.0", port=settings.PORT, reload=(settings.ENV == "development"))
