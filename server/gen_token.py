import asyncio
from utils.auth import create_access_token

token = create_access_token(data={"sub": "69f9b053f98bd00ade88b205", "role": "admin"})
print(token)
