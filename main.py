import sys
import os

# Add the server directory to the Python path
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(BASE_DIR, 'server'))

# Import the FastAPI app from the renamed server/app.py
# By renaming the internal file to 'app.py', we avoid all name collisions with this 'main.py'
from app import app

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", "10000"))
    uvicorn.run(app, host="0.0.0.0", port=port)
