import asyncio
import os
import sys

# Add server directory to path
sys.path.append(os.path.join(os.getcwd(), 'server'))

from db.mongo import connect_to_mongo, get_database

async def list_articles():
    await connect_to_mongo()
    db = get_database()
    if db is None:
        print("Failed to connect to database.")
        return
    cursor = db.articles.find().sort("created_at", -1)
    articles = await cursor.to_list(length=100)
    print(f"Total articles: {len(articles)}")
    for a in articles:
        print(f"Slug: '{a.get('slug')}', Title: '{a.get('title')}'")

if __name__ == "__main__":
    asyncio.run(list_articles())
