import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import certifi

async def test():
    try:
        client = AsyncIOMotorClient(
            'mongodb+srv://nsurendrareddy3_db_user:lp22QQOYlm84p3iy@cluster0.ib2u7um.mongodb.net/?appName=Cluster0',
            tlsCAFile=certifi.where(),
            tlsAllowInvalidCertificates=True
        )
        print('client created')
        await client.admin.command('ping')
        print('pinged successfully')
    except Exception as e:
        print('error:', e)

asyncio.run(test())
