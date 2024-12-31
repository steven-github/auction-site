from fastapi import APIRouter, HTTPException
from app.models import Auction, Bid
from app.db import auctions_collection, bids_collection, users_collection

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
@router.get("/{auction_id}", response_model=Auction)
async def get_auction(auction_id: str):
    auction = await auctions_collection.find_one({"auction_id": auction_id})
    if not auction:
        raise HTTPException(status_code=404, detail="Auction not found")
    return auction

# Create a new auction
@router.post("/", response_model=dict)
async def create_auction(auction: Auction):
    result = await auctions_collection.insert_one(auction.dict())
    return {"id": str(result.inserted_id)}

# Place a bid
@router.post("/{auction_id}/bids", response_model=dict)
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
@router.get("/users")
async def get_all_users():
    users = await users_collection.find().to_list()
    return users