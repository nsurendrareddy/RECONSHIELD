from fastapi import APIRouter, HTTPException, status
from db.mongo import get_database
from models import ContactMessage
from datetime import datetime

router = APIRouter()

@router.post("/")
async def create_contact(message: ContactMessage):
    db = get_database()
    message_dict = message.model_dump(exclude={"id"})
    message_dict["created_at"] = datetime.utcnow()
    
    result = await db.contacts.insert_one(message_dict)
    if not result.inserted_id:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to save message"
        )
        
    return {"status": "success", "message": "Transmission received and secured."}
