import certifi
from motor.motor_asyncio import AsyncIOMotorClient
import logging
from config import settings

logger = logging.getLogger(__name__)

client: AsyncIOMotorClient = None
db = None

async def connect_to_mongo():
    """Connect to MongoDB with SSL verification using certifi."""
    global client, db
    try:
        client = AsyncIOMotorClient(
            settings.MONGO_URI,
            tlsCAFile=certifi.where(),
            tlsAllowInvalidCertificates=True
        )
        db = client[settings.MONGO_DB_NAME]
        logger.info("Connected to MongoDB successfully.")
        
        # Ensure indexes (optional but good for performance)
        await db.users.create_index("email", unique=True)
        await db.history.create_index("user_id")
    except Exception as e:
        logger.error(f"Failed to connect to MongoDB: {e}")

async def close_mongo_connection():
    """Close MongoDB connection."""
    global client
    if client:
        client.close()
        logger.info("MongoDB connection closed.")

def get_database():
    """Get database instance."""
    return db
