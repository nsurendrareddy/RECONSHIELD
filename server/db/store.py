"""MongoDB database layer for scan storage."""
import json
from datetime import datetime, timezone
from motor.motor_asyncio import AsyncIOMotorClient
from config import settings
from utils.logger import logger

client = None
db = None

# Simple in-memory store for database-less operation (Render/Production)
# In production, we rely on Sanity.io for content and Resend for interactions.
# This ensures the app starts even without MongoDB.
_scans = {}

async def init_db():
    """No-op for database-less mode."""
    logger.info("Initializing in Database-Less Mode (Stateless)")
    return True

async def create_scan(scan_id: str, domain: str):
    """Create a new scan record in memory."""
    _scans[scan_id] = {
        "id": scan_id,
        "domain": domain,
        "status": "running",
        "created_at": datetime.now(timezone.utc).isoformat(),
        "completed_at": None,
        "results": None,
        "score": None,
        "grade": None
    }

async def update_scan(scan_id: str, results: dict, score: int, grade: str):
    """Update scan with results in memory."""
    if scan_id in _scans:
        _scans[scan_id].update({
            "status": "completed",
            "results": results,
            "score": score,
            "grade": grade,
            "completed_at": datetime.now(timezone.utc).isoformat()
        })

async def fail_scan(scan_id: str, error: str):
    """Mark scan as failed in memory."""
    if scan_id in _scans:
        _scans[scan_id].update({
            "status": "failed",
            "results": {"error": error},
            "completed_at": datetime.now(timezone.utc).isoformat()
        })

async def get_scan(scan_id: str) -> dict | None:
    """Get scan by ID from memory."""
    return _scans.get(scan_id)

async def get_history(limit: int = 50, offset: int = 0) -> list[dict]:
    """Get scan history from memory."""
    history = sorted(_scans.values(), key=lambda x: x['created_at'], reverse=True)
    return history[offset : offset + limit]

async def delete_scan(scan_id: str) -> bool:
    """Delete a scan record from memory."""
    if scan_id in _scans:
        del _scans[scan_id]
        return True
    return False
