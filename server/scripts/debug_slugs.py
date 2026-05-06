import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os

async def list_articles():
    # Use the URI from config or common knowledge
    mongo_uri = "mongodb+srv://nsurendrareddy3_db_user:lp22QQOYlm84p3iy@cluster0.ib2u7um.mongodb.net/?appName=Cluster0"
    client = AsyncIOMotorClient(mongo_uri)
    db = client.reconshield
    
    print("--- Articles in DB ---")
    async for article in db.articles.find():
        print(f"ID: {article['_id']}")
        print(f"Title: '{article['title']}'")
        print(f"Slug: '{article['slug']}'")
        print(f"Slug Length: {len(article['slug'])}")
        print("--------------------")
    client.close()

if __name__ == "__main__":
    asyncio.run(list_articles())
