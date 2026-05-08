import sys
import os

# Add the server directory to the Python path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'server'))

# Import the FastAPI app from server/main.py
from main import app
