from contextlib import asynccontextmanager
from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from slowapi import _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded
import os

from config import settings
from routes.scan import router as scan_router
from routes.contact import router as contact_router

from utils.logger import logger
from middleware.rate_limiter import limiter

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Startup and shutdown events (Database-Less Mode)."""
    logger.info(f"ReconShield API initializing in {settings.ENV} mode (Sanity.io Powered)")
    # Ensure uploads directory exists
    if not os.path.exists("uploads"):
        os.makedirs("uploads", exist_ok=True)
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
    "https://reconshield.vercel.app",
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
    logger.info(f"{request.method} {request.url.path} from {request.client.host}")
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
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=settings.PORT, reload=True)
