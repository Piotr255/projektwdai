import os
import bcrypt
import jwt
from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, JWTManager
from flask_jwt_extended import current_user
from flask_jwt_extended import jwt_required
from app import app, db
from app import User

logreg = Blueprint('logreg',__name__)

logreg.config["JWT_SECRET_KEY"] = os.getenv('JWT_SECRET')
logreg = JWTManager(app)




def hash_password(password):
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt)
    return hashed_password

@jwt.user_identity_loader
def user_identity_lookup(user):
    return user.id
@jwt.user_lookup_loader
def user_lookup_callback(_jwt_header, jwt_data):
    identity = jwt_data["sub"]
    return User.query.filter_by(id=identity).one_or_none()
@logreg.route("/login", methods=["POST"])
def login():
    username = request.json.get("username", None)
    password = request.json.get("password", None)

    user = User.query.filter_by(username=username).one_or_none()
    if not user or not user.check_password(password):
        return jsonify("Wrong username or password"), 401

    # Notice that we are passing in the actual sqlalchemy user object here
    access_token = create_access_token(identity=user)
    return jsonify(access_token=access_token)


@logreg.route("/registration", method = ["POST"])
def registration():
    email = request.json.get("email", None)
    username = request.json.get("username", None)
    password = request.json.get("password", None)
    user = User.query.filter_by(username=username).one_or_none()
    if user:
        return jsonify("Use different username"), 401
    hashed_password = hash_password(password)
    new_user = User(email=email, username=username, password=hashed_password)
    db.session.add(new_user)
    try:
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

    return jsonify("User registered successfully"), 200