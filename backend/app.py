from flask import Flask
from flask_cors import CORS
from flask_socketio import SocketIO
from authentication import auth_blueprint
from genai_recommendations import recommend_blueprint
from utils import db_connect

app = Flask(__name__)
CORS(app)

# Setup DB connection
db_connect(app)

# WebSocket setup for notifications (optional)
socketio = SocketIO(app, cors_allowed_origins="*")

# Register Blueprints
app.register_blueprint(auth_blueprint, url_prefix="/auth")
app.register_blueprint(recommend_blueprint, url_prefix="/recommend")

# Define the root route
@app.route('/')
def hello_world():
    return "Hello, World!"

if __name__ == "__main__":
    socketio.run(app, debug=True)
