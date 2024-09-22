from pymongo import MongoClient
from bson.objectid import ObjectId

client = MongoClient('mongodb://localhost:27017/')
db = client['skill_navigator']

class User:
    def __init__(self, email, password):
        self.email = email
        self.password = password
    
    def save(self):
        db.users.insert_one({'email': self.email, 'password': self.password})
    
    @staticmethod
    def query(filter_by):
        return db.users.find_one(filter_by)
    
    @staticmethod
    def get(user_id):
        return db.users.find_one({"_id": ObjectId(user_id)})
    
    def delete(self):
        db.users.delete_one({"_id": ObjectId(self._id)})
