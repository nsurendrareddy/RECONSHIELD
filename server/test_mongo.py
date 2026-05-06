import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import certifi

async def test():
    try:
        client = AsyncIOMotorClient(
            '',
            tlsCAFile=certifi.where(),
            tlsAllowInvalidCertificates=True
        )
        print('client created')
        await client.admin.command('ping')
        print('pinged successfully')
    except Exception as e:
        print('error:', e)

asyncio.run(test())
