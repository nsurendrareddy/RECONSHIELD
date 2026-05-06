import asyncio
from db.mongo import connect_to_mongo, get_database

async def check_users():
    await connect_to_mongo()
    db = get_database()
    users = await db.users.find().to_list(length=10)
    for u in users:
        print(f"User: {u.get('email')}, Role: {u.get('role')}, ID: {u.get('_id')}")

if __name__ == "__main__":
    asyncio.run(check_users())
