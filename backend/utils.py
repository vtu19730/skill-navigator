import bcrypt
from pymongo import MongoClient

def db_connect(app):
    client = MongoClient('mongodb://localhost:27017/')
    app.db = client['skill_navigator']

def hash_password(password):
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

def validate_password(password, hashed):
    return bcrypt.checkpw(password.encode('utf-8'), hashed)

def get_skills(skills):
    return ', '.join(skills)
