from flask import Blueprint, request, jsonify
import jwt
from models import User
from utils import validate_password, hash_password
import datetime

auth_blueprint = Blueprint('auth', __name__)
SECRET_KEY = "your_secret_key"

@auth_blueprint.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    email = data['email']
    password = hash_password(data['password'])
    
    if User.query({'email': email}):
        return jsonify({'message': 'User already exists'}), 409
    
    new_user = User(email=email, password=password)
    new_user.save()
    
    return jsonify({'message': 'User created successfully'}), 201

@auth_blueprint.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data['email']
    password = data['password']
    
    user = User.query({'email': email})
    if not user or not validate_password(password, user['password']):
        return jsonify({'message': 'Invalid credentials'}), 401
    
    token = jwt.encode({'user_id': str(user['_id']), 'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)}, SECRET_KEY)
    return jsonify({'token': token}), 200
