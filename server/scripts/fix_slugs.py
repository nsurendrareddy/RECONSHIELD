import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os

async def fix_slugs():
    mongo_uri = "mongodb+srv://nsurendrareddy3_db_user:lp22QQOYlm84p3iy@cluster0.ib2u7um.mongodb.net/?appName=Cluster0"
    client = AsyncIOMotorClient(mongo_uri)
    db = client.reconshield
    
    print("--- Fixing Slugs in DB ---")
    async for article in db.articles.find():
        old_slug = article['slug']
        new_slug = old_slug.strip()
        if old_slug != new_slug:
            print(f"Fixing ID {article['_id']}: '{old_slug}' -> '{new_slug}'")
            await db.articles.update_one({"_id": article['_id']}, {"$set": {"slug": new_slug}})
        else:
            print(f"Slug already clean for ID {article['_id']}: '{old_slug}'")
            
    print("Done.")
    client.close()

if __name__ == "__main__":
    asyncio.run(fix_slugs())
