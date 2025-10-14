from flask import Blueprint, request, jsonify
from bson import ObjectId
from config import mongo

overlay_bp = Blueprint("overlay", __name__)

@overlay_bp.route("/", methods=["GET"])
def get_overlays():
    overlays = mongo.db.overlays.find()
    result = [{**o, "_id": str(o["_id"])} for o in overlays]
    return jsonify(result), 200

@overlay_bp.route("/", methods=["POST"])
def create_overlay():
    data = request.json
    mongo.db.overlays.insert_one(data)
    return jsonify({"message": "Overlay created"}), 201

@overlay_bp.route("/<id>", methods=["PUT"])
def update_overlay(id):
    data = request.json
    mongo.db.overlays.update_one({"_id": ObjectId(id)}, {"$set": data})
    return jsonify({"message": "Overlay updated"}), 200

@overlay_bp.route("/<id>", methods=["DELETE"])
def delete_overlay(id):
    mongo.db.overlays.delete_one({"_id": ObjectId(id)})
    return jsonify({"message": "Overlay deleted"}), 200
