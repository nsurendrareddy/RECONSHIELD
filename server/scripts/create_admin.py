import asyncio
import sys
import os

# Add parent directory to path so we can import from server
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from db.mongo import connect_to_mongo, get_database, close_mongo_connection
from utils.auth import get_password_hash
from datetime import datetime

async def create_admin():
    await connect_to_mongo()
    db = get_database()
    
    email = "nsurendrareddy3@gmail.com"
    password = "Reddy9999@"
    
    existing_user = await db.users.find_one({"email": email})
    if existing_user:
        print(f"Admin user {email} already exists!")
        # Optional: update to admin if they exist but aren't admin
        if existing_user.get("role") != "admin":
            await db.users.update_one({"email": email}, {"$set": {"role": "admin"}})
            print(f"Updated {email} to admin role.")
    else:
        hashed_password = get_password_hash(password)
        admin_dict = {
            "email": email,
            "password": hashed_password,
            "role": "admin",
            "created_at": datetime.utcnow()
        }
        await db.users.insert_one(admin_dict)
        print(f"Created admin user: {email}")
        
    await close_mongo_connection()

if __name__ == "__main__":
    asyncio.run(create_admin())
