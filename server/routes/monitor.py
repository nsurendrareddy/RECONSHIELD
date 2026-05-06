"""Domain monitoring — watch domains and webhook notifications."""
from fastapi import APIRouter, Depends
from pydantic import BaseModel
from db.mongo import get_database
from utils.auth import get_current_user
from utils.logger import logger

router = APIRouter()


class WatchRequest(BaseModel):
    domain: str


class WebhookConfig(BaseModel):
    url: str
    domain: str


@router.post("/watch")
async def watch_domain(body: WatchRequest, current_user: dict = Depends(get_current_user)):
    """Add a domain to user's watch list."""
    db = get_database()
    await db.users.update_one(
        {"_id": current_user["_id"]},
        {"$addToSet": {"watched_domains": body.domain}},
    )
    return {"message": f"Now watching {body.domain}", "domain": body.domain}


@router.delete("/watch/{domain}")
async def unwatch_domain(domain: str, current_user: dict = Depends(get_current_user)):
    """Remove a domain from user's watch list."""
    db = get_database()
    await db.users.update_one(
        {"_id": current_user["_id"]},
        {"$pull": {"watched_domains": domain}},
    )
    return {"message": f"Stopped watching {domain}"}


@router.get("/watched")
async def get_watched_domains(current_user: dict = Depends(get_current_user)):
    """Get list of watched domains for current user."""
    db = get_database()
    user = await db.users.find_one({"_id": current_user["_id"]}, {"_id": 0})
    return {"watched_domains": user.get("watched_domains", []) if user else []}


@router.post("/webhook")
async def register_webhook(body: WebhookConfig, current_user: dict = Depends(get_current_user)):
    """Register a webhook URL for scan completion notifications."""
    db = get_database()
    await db.users.update_one(
        {"_id": current_user["_id"]},
        {"$set": {f"webhooks.{body.domain}": body.url}},
    )
    return {"message": f"Webhook registered for {body.domain}", "url": body.url}


async def send_webhook(url: str, payload: dict):
    """Send webhook notification to registered URL."""
    try:
        import httpx
        async with httpx.AsyncClient(timeout=10) as client:
            await client.post(url, json=payload)
        logger.info(f"Webhook sent to {url}")
    except Exception as e:
        logger.warning(f"Webhook to {url} failed: {e}")
