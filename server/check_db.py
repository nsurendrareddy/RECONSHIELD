import asyncio
from db.store import init_db, get_history

async def check():
    await init_db()
    scans = await get_history(limit=5)
    for s in scans:
        print(f"ID: {s['id']}, Domain: {s['domain']}, Status: {s['status']}")

if __name__ == "__main__":
    asyncio.run(check())
