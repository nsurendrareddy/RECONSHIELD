import sys
import os

# Add the server directory to the Python path
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
SERVER_PATH = os.path.join(BASE_DIR, 'server')

if SERVER_PATH not in sys.path:
    sys.path.insert(0, SERVER_PATH)

# Since this file is named 'entrypoint.py', there is no collision with 'server/main.py'
# The 'from main' import will correctly find server/main.py
try:
    from main import app
except ImportError:
    # Fallback if Render's environment handles packages differently
    import main as server_main
    app = server_main.app

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", "10000"))
    uvicorn.run(app, host="0.0.0.0", port=port)
