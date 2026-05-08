import os
import sys

# Get the absolute path of the current directory (project root)
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
SERVER_DIR = os.path.join(BASE_DIR, "server")

# Add 'server' to sys.path so that 'from config import settings' works inside server/main.py
if SERVER_DIR not in sys.path:
    sys.path.insert(0, SERVER_DIR)

# Also add root to sys.path if not already there
if BASE_DIR not in sys.path:
    sys.path.append(BASE_DIR)

# Import 'app' from 'server/main.py'
# Using 'from server.main import app' ensures we don't shadow the current 'main' module
try:
    from server.main import app
except ImportError as e:
    # Fallback: manually load the module if package import fails
    try:
        import importlib.util
        spec = importlib.util.spec_from_file_location("server_main_mod", os.path.join(SERVER_DIR, "main.py"))
        server_main_mod = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(server_main_mod)
        app = server_main_mod.app
    except Exception as second_e:
        print(f"Critical Error: Could not import app from server/main.py")
        print(f"Primary error: {e}")
        print(f"Secondary error: {second_e}")
        raise

if __name__ == "__main__":
    import uvicorn
    # Render provides the PORT environment variable
    port = int(os.getenv("PORT", "10000"))
    uvicorn.run(app, host="0.0.0.0", port=port)
