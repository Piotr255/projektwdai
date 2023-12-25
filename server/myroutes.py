import os
import bcrypt
import jwt
from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, JWTManager
from flask_jwt_extended import current_user
from flask_jwt_extended import jwt_required
from app import app, db
from app import User

#logreg = Blueprint('logreg',__name__)




