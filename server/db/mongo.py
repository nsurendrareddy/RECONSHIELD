import certifi
from motor.motor_asyncio import AsyncIOMotorClient
import logging
from config import settings

logger = logging.getLogger(__name__)

client: AsyncIOMotorClient = None
db = None

async def connect_to_mongo():
    """Connect to MongoDB and verify connection with a ping."""
    global client, db
    try:
        # Use a shorter timeout for the initial connection check
        client = AsyncIOMotorClient(
            settings.MONGO_URI,
            tlsCAFile=certifi.where(),
            tlsAllowInvalidCertificates=True,
            serverSelectionTimeoutMS=5000 
        )
        db = client[settings.MONGO_DB_NAME]
        
        # Ping the database to verify connection
        await client.admin.command('ping')
        logger.info("✅ Connected to MongoDB successfully.")
        
        # Ensure indexes
        await db.users.create_index("email", unique=True)
        await db.history.create_index("user_id")
    except Exception as e:
        logger.error(f"❌ Failed to connect to MongoDB: {e}")
        logger.error("TIP: Ensure your MongoDB Atlas IP Whitelist allows '0.0.0.0/0'")
        db = None # Ensure db is None if connection fails

async def close_mongo_connection():
    """Close MongoDB connection."""
    global client
    if client:
        client.close()
        logger.info("MongoDB connection closed.")

def get_database():
    """Get database instance."""
    return db
