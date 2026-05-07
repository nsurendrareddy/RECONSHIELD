"""MongoDB database layer for scan storage."""
import json
from datetime import datetime, timezone
from motor.motor_asyncio import AsyncIOMotorClient
from config import settings
from utils.logger import logger

client = None
db = None

async def init_db():
    """Initialize the database connection and indexes."""
    global client, db
    client = AsyncIOMotorClient(
        settings.MONGO_URI,
        serverSelectionTimeoutMS=5000
    )
    db = client[settings.MONGO_DB_NAME]
    
    # Verify connection
    await client.admin.command('ping')
    
    # Create indexes
    await db.scans.create_index("domain")
    await db.scans.create_index([("created_at", -1)])
    logger.info("MongoDB initialized")


async def create_scan(scan_id: str, domain: str):
    """Create a new scan record."""
    await db.scans.insert_one({
        "id": scan_id,
        "domain": domain,
        "status": "running",
        "created_at": datetime.now(timezone.utc).isoformat(),
        "completed_at": None,
        "results": None,
        "score": None,
        "grade": None
    })


async def update_scan(scan_id: str, results: dict, score: int, grade: str):
    """Update scan with results."""
    await db.scans.update_one(
        {"id": scan_id},
        {
            "$set": {
                "status": "completed",
                "results": results,
                "score": score,
                "grade": grade,
                "completed_at": datetime.now(timezone.utc).isoformat()
            }
        }
    )


async def fail_scan(scan_id: str, error: str):
    """Mark scan as failed."""
    await db.scans.update_one(
        {"id": scan_id},
        {
            "$set": {
                "status": "failed",
                "results": {"error": error},
                "completed_at": datetime.now(timezone.utc).isoformat()
            }
        }
    )


async def get_scan(scan_id: str) -> dict | None:
    """Get scan by ID."""
    scan = await db.scans.find_one({"id": scan_id}, {"_id": 0})
    if scan:
        return scan
    return None


async def get_history(limit: int = 50, offset: int = 0) -> list[dict]:
    """Get scan history."""
    cursor = db.scans.find({}, {
        "_id": 0, "results": 0  # omit results to match original behavior
    }).sort("created_at", -1).skip(offset).limit(limit)
    
    return await cursor.to_list(length=limit)


async def delete_scan(scan_id: str) -> bool:
    """Delete a scan record."""
    result = await db.scans.delete_one({"id": scan_id})
    return result.deleted_count > 0
