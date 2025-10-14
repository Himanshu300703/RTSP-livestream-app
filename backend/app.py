from flask import Flask
from flask_cors import CORS
from routes.overlays import overlay_bp
from config import mongo

app = Flask(__name__)
CORS(app)

app.config["MONGO_URI"] = "mongodb://localhost:27017/rtsp_overlay_db"
mongo.init_app(app)

app.register_blueprint(overlay_bp, url_prefix="/api/overlays")

if __name__ == "__main__":
    app.run(debug=True, port=5000)
