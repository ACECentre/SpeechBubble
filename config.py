# config.py
import os

MONGO_URI = os.environ.get('MONGOHQ_URL', None)

_cwd = os.path.dirname(os.path.abspath(__file__))

SECRET_KEY = 'flask-session-insecure-secret-key'

DEBUG = True

GOOGLE_ANALYTICS_CODE = ''

# MongoDB Config
if not MONGO_URI:
    MONGODB_DB = 'speechbubble'
    MONGODB_HOST = 'localhost'
    MONGODB_PORT = 27017

# Flask-security settings
#SECURITY_CONFIRMABLE = True
SECURITY_REGISTERABLE = True
SECURITY_RECOVERABLE = True
SECURITY_CHANGEABLE = True

PRODUCT_VERSION_HISTORY_MAX = 10
