from fastapi import FastAPI, HTTPException
from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId

app = FastAPI()

# MongoDB Connection String
MONGO_URI = "mongodb+srv://stvn20:fEtcVVCQF3LpGumM@cluster0.hklgm.mongodb.net/auction_db?retryWrites=true&w=majority"

# Initialize MongoDB Client
client = AsyncIOMotorClient(MONGO_URI)
db = client["auction_db"]  # Database name
auction_collection = db["auctions"]


# Helper function to convert MongoDB documents to JSON serializable
def serialize_document(document):
    """Converts MongoDB documents to JSON-serializable format."""
    if document:
        document["_id"] = str(document["_id"])
    return document


@app.on_event("startup")
async def connect_to_db():
    """Connect to the database on application startup."""
    try:
        await client.admin.command('ping')
        print("Successfully connected to MongoDB!")
    except Exception as e:
        print(f"Error connecting to MongoDB: {e}")


@app.on_event("shutdown")
async def close_db_connection():
    """Close the database connection on application shutdown."""
    client.close()


@app.post("/create-auction")
async def create_auction(auction: dict):
    """Create a new auction item."""
    try:
        result = await auction_collection.insert_one(auction)
        return {"message": "Auction created successfully", "id": str(result.inserted_id)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error creating auction: {e}")


@app.get("/auctions")
async def get_auctions():
    """Retrieve all auction items."""
    try:
        auctions = await auction_collection.find().to_list(100)  # Limit to 100 results
        return [serialize_document(auction) for auction in auctions]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving auctions: {e}")


@app.delete("/auctions/{auction_id}")
async def delete_auction(auction_id: str):
    """Delete an auction item by ID."""
    try:
        result = await auction_collection.delete_one({"_id": ObjectId(auction_id)})
        if result.deleted_count:
            return {"message": "Auction deleted successfully"}
        else:
            raise HTTPException(status_code=404, detail="Auction not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error deleting auction: {e}")