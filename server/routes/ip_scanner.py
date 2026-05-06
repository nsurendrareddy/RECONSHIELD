"""IP Scanner API route."""
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from services.ip_scanner_service import run_ip_scan
from services.private_ip import PrivateIPService
from services.ip_info import get_ip_info
from utils.logger import logger
import httpx

router = APIRouter()


class IpScanRequest(BaseModel):
    target: str


@router.post("")
async def scan_ip(body: IpScanRequest):
    """Run an advanced IP intelligence scan."""
    target = body.target.strip().lower()
    if not target:
        raise HTTPException(status_code=400, detail="Target is required")

    # Basic validation
    if any(c in target for c in [" ", "<", ">", ";"]):
        raise HTTPException(status_code=400, detail="Invalid target")

    try:
        result = await run_ip_scan(target)
        return result
    except Exception as e:
        logger.error(f"IP scan failed for {target}: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/private-context/{ip}")
async def get_private_context(ip: str):
    """Get educational context for a private IP address."""
    return PrivateIPService.get_network_context(ip)


@router.get("/private-recommendations/{ip}")
async def get_private_recommendations(ip: str):
    """Get security recommendations for a private IP address."""
    return PrivateIPService.get_security_recommendations(ip)


@router.get("/router-location")
async def get_router_location():
    """Get the public IP location of the server/router."""
    try:
        async with httpx.AsyncClient() as client:
            resp = await client.get("https://api.ipify.org?format=json")
            public_ip = resp.json().get("ip")
            location = await get_ip_info(public_ip)
            return {
                "public_ip": public_ip,
                "location": location
            }
    except Exception as e:
        logger.error(f"Failed to get router location: {e}")
        return {"error": str(e)}
