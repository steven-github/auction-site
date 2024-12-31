from fastapi import FastAPI
from app.routers import auctions

# Create FastAPI instance
app = FastAPI(
    title="Auction and Bidding System",
    description="API for managing auctions and bids.",
    version="1.0.0"
)

# Include API routes
app.include_router(auctions.router, prefix="/api/v1/auctions", tags=["Auctions"])

# Root endpoint
@app.get("/", tags=["Root"])
async def root():
    return {"message": "Welcome to the Auction and Bidding API!"}