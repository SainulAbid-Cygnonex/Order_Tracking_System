import os
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()
def get_db():
    mongo_uri = os.getenv("MONGO_URI")
    client = MongoClient(mongo_uri)
    db = client.get_default_database()
    return db
