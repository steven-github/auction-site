from fastapi import APIRouter, HTTPException
from app.models import Auction, Bid, User
from app.db import auctions_collection, bids_collection, users_collection
from bson import ObjectId
from fastapi.encoders import jsonable_encoder

router = APIRouter()

# Get all auctions
@router.get("/", response_model=list[Auction])
async def get_all_auctions():
    try:
        auctions = await auctions_collection.find().to_list()
        return auctions
    except Exception as e:
        print(f"Error fetching auctions: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")

# Get a specific auction by ID
@router.get("/auction/{auction_id}", response_model=Auction)
async def get_auction(auction_id: str):
    try:
        auction = await auctions_collection.find_one({"auction_id": auction_id})
        if not auction:
            raise HTTPException(status_code=404, detail="Auction not found")
        return auction
    except Exception as e:
        print(f"Error fetching auction: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")

# Update a specific auction by ID
@router.put("/update/{auction_id}", response_model=Auction)
async def update_auction(auction_id: str, auction: Auction):
    try:
        result = await auctions_collection.update_one({"auction_id": auction_id}, {"$set": auction.dict()})
        if result.modified_count == 0:
            raise HTTPException(status_code=404, detail="Auction not found")
        return await get_auction(auction_id)
    except Exception as e:
        print(f"Error updating auction: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")

# Delete a specific auction by ID
@router.delete("/delete/{auction_id}")
async def delete_auction(auction_id: str):
    try:
        result = await auctions_collection.delete_one({"auction_id": auction_id})
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Auction not found")
        return {"message": "Auction deleted successfully"}
    except Exception as e:
        print(f"Error deleting auction: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")


@router.post("/create-auction")
async def create_auction(auction: Auction):
    try:
        auction_data = auction.dict(by_alias=True, exclude_unset=True)
        result = await auctions_collection.insert_one(auction_data)
        auction_data["_id"] = str(result.inserted_id)
        return {"message": "Auction created successfully", "auction": auction_data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
# Create a new auction
@router.post("/", response_model=dict)
async def create_auction(auction: Auction):
    result = await auctions_collection.insert_one(auction.dict())
    return {"id": str(result.inserted_id)}

# Place a bid
@router.post("/auction/{auction_id}/bids", response_model=dict)
async def place_bid(auction_id: str, bid: Bid):
    auction = await auctions_collection.find_one({"auction_id": auction_id})
    if not auction:
        raise HTTPException(status_code=404, detail="Auction not found")

    if bid.amount <= auction["current_price"]:
        raise HTTPException(status_code=400, detail="Bid must be higher than the current price")

    await auctions_collection.update_one(
        {"auction_id": auction_id},
        {"$push": {"bids": bid.dict()}, "$set": {"current_price": bid.amount}}
    )
    await bids_collection.insert_one(bid.dict())
    return {"message": "Bid placed successfully"}

#Get all users
# Custom encoder for ObjectId
def serialize_mongo_document(document):
    """
    Convert MongoDB documents to JSON-serializable format.
    """
    if isinstance(document, list):
        return [serialize_mongo_document(doc) for doc in document]
    if isinstance(document, dict):
        return {
            key: str(value) if isinstance(value, ObjectId) else value
            for key, value in document.items()
        }
    return document

# Example: Updating your routes to handle ObjectId serialization
@router.get("/users", response_model=list)
async def get_all_users():
    try:
        users = await users_collection.find().to_list(length=None)
        return serialize_mongo_document(users)
    except Exception as e:
        print(f"Error fetching users: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")

@router.post("/save-user")
async def save_user(user: User):
    existing_user = await users_collection.find_one({"email": user.email})

    if existing_user:
        # Convert the existing user document to JSON-serializable format
        existing_user["_id"] = str(existing_user["_id"])  # Serialize ObjectId
        return {"message": "User already exists", "user": existing_user}

    # Insert new user
    new_user = {
        "given_name": user.given_name,
        "family_name": user.family_name,
        "nickname": user.nickname,
        "name": user.name,
        "picture": user.picture,
        "updated_at": user.updated_at,
        "email": user.email,
        "email_verified": user.email_verified,
        "sub": user.sub,
        "sid": user.sid,
    }
    result = await users_collection.insert_one(new_user)
    return {"message": "User created successfully", "user_id": str(result.inserted_id)}

@router.get("/user/{user_id}")
async def get_user(user_id: str):
    try:
        user = await users_collection.find_one({"_id": ObjectId(user_id)})
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        return serialize_mongo_document(user)
    except Exception as e:
        print(f"Error fetching user: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")
    existing_user = await users_collection.find_one({"email": user.email})

    if existing_user:
        return {"message": "User already exists", "user": existing_user}

    # Insert new user
    new_user = {
        "given_name": user.given_name,
        "family_name": user.family_name,
        "nickname": user.nickname,
        "name": user.name,
        "picture": user.picture,
        "updated_at": user.updated_at,
        "email": user.email,
        "email_verified": user.email_verified,
        "sub": user.sub,
        "sid": user.sid,
    }
    result = await users_collection.insert_one(new_user)
    return {"message": "User created successfully", "user_id": str(result.inserted_id)}
