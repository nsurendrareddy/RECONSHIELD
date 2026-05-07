"""
ReconShield — Ethical Intelligence & Security Analyzer
FastAPI Backend Server
"""
from contextlib import asynccontextmanager
from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from slowapi import _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded
import os

from config import settings
from db.store import init_db
from db.mongo import connect_to_mongo, close_mongo_connection
from routes.scan import router as scan_router
from routes.history import router as history_router
from routes.export import router as export_router
from routes.auth import router as auth_router
from routes.blog import router as blog_router
from routes.contact import router as contact_router
from routes.monitor import router as monitor_router
from routes.ip_scanner import router as ip_scanner_router
from utils.logger import logger
from middleware.rate_limiter import limiter


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Startup and shutdown events."""
    await init_db()
    await connect_to_mongo()
    # Ensure uploads directory exists
    if not os.path.exists("uploads/blog"):
        os.makedirs("uploads/blog", exist_ok=True)
    logger.info("ReconShield API started")
    yield
    await close_mongo_connection()
    logger.info("ReconShield API shutting down")


app = FastAPI(
    title="ReconShield API",
    description="Ethical Intelligence & Security Analyzer",
    version="1.0.0",
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
    frontend_url.rstrip("/")
]

# Ensure we don't have duplicates and filter out empty strings
allowed_origins = list(set([o for o in allowed_origins if o]))

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["Content-Disposition"],
)


# Request logging
@app.middleware("http")
async def log_requests(request: Request, call_next):
    logger.info(f"{request.method} {request.url.path} from {request.client.host}")
    response = await call_next(request)
    return response


# Root route
@app.get("/")
async def root():
    return {
        "message": "ReconShield API is running",
        "version": "1.0.0",
        "docs": "/docs",
        "health": "/api/health"
    }


# API Base route
@app.get("/api")
async def api_root():
    return {
        "message": "ReconShield API Base",
        "status": "active",
        "endpoints": ["/scan", "/history", "/auth", "/ip-scanner"]
    }


# Global error handler
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.error(f"Unhandled error: {exc}", exc_info=True)
    return JSONResponse(
        status_code=500,
        content={"error": "Internal server error", "detail": str(exc)},
    )


# Health check
@app.get("/api/health")
async def health_check():
    from db.mongo import get_database
    db = get_database()
    return {
        "status": "ok",
        "version": "1.0.0",
        "database": "connected" if db is not None else "disconnected"
    }


# Mount routers
app.include_router(scan_router, prefix="/api/scan", tags=["Scan"])
app.include_router(history_router, prefix="/api/history", tags=["History"])
app.include_router(export_router, prefix="/api/export", tags=["Export"])
app.include_router(auth_router, prefix="/api/auth", tags=["Authentication"])
app.include_router(blog_router, prefix="/api/blog", tags=["Blog"])
app.include_router(contact_router, prefix="/api/contact", tags=["Contact"])
app.include_router(monitor_router, prefix="/api/monitor", tags=["Monitor"])
app.include_router(ip_scanner_router, prefix="/api/ip-scanner", tags=["IP Scanner"])
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")


@app.on_event("startup")
async def startup_event():
    logger.info(f"Environment: {settings.ENV}")
    logger.info(f"Allowed Origins: {allowed_origins}")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=settings.PORT, reload=True)
