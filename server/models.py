from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime, timezone

class ContactMessage(BaseModel):
    name: str
    email: EmailStr
    message: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

    model_config = {
        "populate_by_name": True,
        "arbitrary_types_allowed": True
    }
