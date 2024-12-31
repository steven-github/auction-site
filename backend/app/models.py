from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime

class User(BaseModel):
    user_id: str
    name: str
    email: str
    created_at: datetime

class Bid(BaseModel):
    bid_id: str
    auction_id: str
    user_id: str
    amount: float
    timestamp: datetime

class Bid(BaseModel):
    bid_id: Optional[str] = None
    auction_id: Optional[str] = None
    user_id: str
    amount: float
    timestamp: datetime

class Auction(BaseModel):
    auction_id: str
    title: str
    description: str
    starting_price: float
    current_price: float
    end_time: datetime
    bids: Optional[List[Bid]] = []










