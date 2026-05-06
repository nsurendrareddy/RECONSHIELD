"""History API routes."""
from fastapi import APIRouter, HTTPException
from db.store import get_history, delete_scan

router = APIRouter()


@router.get("")
async def list_history(limit: int = 50, offset: int = 0):
    """Get scan history (paginated)."""
    scans = await get_history(limit=min(limit, 100), offset=offset)
    return {"scans": scans, "count": len(scans)}


@router.delete("/{scan_id}")
async def remove_scan(scan_id: str):
    """Delete a scan from history."""
    deleted = await delete_scan(scan_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Scan not found")
    return {"message": "Scan deleted", "id": scan_id}
