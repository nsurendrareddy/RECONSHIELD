import sys
import os
import importlib.util

# Absolute path resolution
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
SERVER_DIR = os.path.join(BASE_DIR, 'server')

# Add server directory to path for local module resolution (config, routes, etc.)
if SERVER_DIR not in sys.path:
    sys.path.insert(0, SERVER_DIR)

# Manually load server/main.py to avoid name collision with this root main.py
# This prevents the "circular import" error from name shadowing
spec = importlib.util.spec_from_file_location("server_app_internal", os.path.join(SERVER_DIR, "main.py"))
server_app = importlib.util.module_from_spec(spec)
sys.modules["server_app_internal"] = server_app
spec.loader.exec_module(server_app)

# Export the app instance for Uvicorn
app = server_app.app
