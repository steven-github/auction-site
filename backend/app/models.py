from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime
from bson import ObjectId

class User(BaseModel):
    user_id: Optional[str] = Field(default=None, alias="_id")  # Optional _id
    given_name: str
    family_name: str
    nickname: Optional[str] = None
    name: str
    picture: Optional[str] = None
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    email: str  # Validates as an email
    email_verified: bool
    sub: str
    sid: str
    created_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        allow_population_by_field_name = True  # Allows population using "_id"
        json_encoders = {datetime: lambda v: v.isoformat()}  # Serialize datetime as ISO 8601

# Helper for ObjectId serialization
class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid ObjectId")
        return str(v)

    @classmethod
    def __modify_schema__(cls, field_schema):
        field_schema.update(type="string")

# Bid Model
class Bid(BaseModel):
    user_id: str  # Convert ObjectId to string
    amount: float
    timestamp: datetime
    sid: Optional[str] = None  # Add optional field

    class Config:
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}

# Auction Response Model
class Auction(BaseModel):
    auction_id: Optional[str] = Field(..., alias="_id")  # Map MongoDB `_id` to `auction_id`
    title: str
    description: str
    images: List[str]
    starting_price: float
    current_price: float
    start_time: datetime
    end_time: datetime
    created_by: str  # Convert ObjectId to string
    bids: List[Bid]
    created_at: datetime
    updated_at: datetime

    class Config:
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        allow_population_by_field_name = True