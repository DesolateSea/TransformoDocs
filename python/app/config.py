import os
from dotenv import load_dotenv

load_dotenv(os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), ".env"))

class Config:
    PORT = int(os.getenv("PYTHON_BACKEND_PORT", default=5000))
    DEBUG = os.getenv("DEBUG", default="True").lower() == "true"