from fastapi import APIRouter, HTTPException, status
from models import ContactMessage
from datetime import datetime, timezone
from services.email_service import email_service
from utils.logger import logger

router = APIRouter()

@router.post("/")
async def create_contact(message: ContactMessage):
    """
    Handle contact form submissions in Database-Less mode.
    Transmissions are logged and can be optionally forwarded via Resend.
    """
    logger.info(f"Contact message received from {message.email}")
    
    # Send notification email using the configured email_service
    email_service.send_notification(message.model_dump())
    
    return {
        "status": "success", 
        "message": "Transmission received. The ReconShield team will investigate.",
        "received_at": datetime.now(timezone.utc).isoformat()
    }
