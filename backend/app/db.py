from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
import os

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")
# MONGO_URI = "mongodb+srv://stvn20:fEtcVVCQF3LpGumM@cluster0.hklgm.mongodb.net/auction_db?retryWrites=true&w=majority"
if not MONGO_URI:
    raise ValueError("MONGO_URI is not set in the .env file")

client = AsyncIOMotorClient(MONGO_URI)
database = client["auction_db"]
users_collection = database["users"]
auctions_collection = database["auctions"]
bids_collection = database["bids"]