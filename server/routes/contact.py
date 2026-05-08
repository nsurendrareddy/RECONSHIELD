from fastapi import APIRouter, HTTPException, status
from db.mongo import get_database
from models import ContactMessage
from datetime import datetime

router = APIRouter()

@router.post("/")
async def create_contact(message: ContactMessage):
    # In a database-less setup, we could send an email here via Resend
    # For now, we just acknowledge the receipt
    return {"status": "success", "message": "Transmission received. The ReconShield team will investigate."}
