// MongoDB Playground
// This script sets up the database, creates collections, inserts sample data, and demonstrates basic queries.

// Switch to the target database (create if it doesn't exist)
use("auction_db");

// Drop the database if you want to reset it (use carefully in production)
// db.dropDatabase();

// 1. Create Collections
// Collections will be created automatically when documents are inserted, but here we explicitly create them.
db.createCollection("users");
db.createCollection("auctions");
db.createCollection("bids");

// 2. Insert Sample Data
// Insert users
db.users.insertMany([
    {
        user_id: "user1",
        name: "John Doe",
        email: "john.doe@example.com",
        created_at: new Date("2024-01-01T12:00:00Z"),
    },
    {
        user_id: "user2",
        name: "Jane Smith",
        email: "jane.smith@example.com",
        created_at: new Date("2024-01-02T15:30:00Z"),
    },
]);

// Insert auctions
db.auctions.insertMany([
    {
        auction_id: "auction1",
        title: "Vintage Watch",
        description: "A beautiful vintage watch.",
        starting_price: 100,
        current_price: 150,
        end_time: new Date("2024-01-15T12:00:00Z"),
        bids: [],
    },
    {
        auction_id: "auction2",
        title: "Antique Vase",
        description: "An antique vase from the 18th century.",
        starting_price: 200,
        current_price: 250,
        end_time: new Date("2024-01-20T18:00:00Z"),
        bids: [],
    },
]);

// Insert bids
db.bids.insertMany([
    {
        bid_id: "bid1",
        auction_id: "auction1",
        user_id: "user1",
        amount: 150,
        timestamp: new Date("2024-01-10T14:00:00Z"),
    },
    {
        bid_id: "bid2",
        auction_id: "auction2",
        user_id: "user2",
        amount: 250,
        timestamp: new Date("2024-01-11T10:30:00Z"),
    },
]);

// 3. Queries
// Query all users
console.log("All Users:");
db.users.find({}).forEach((user) => {
    printjson(user);
});

// Query all auctions
console.log("\nAll Auctions:");
db.auctions.find({}).forEach((auction) => {
    printjson(auction);
});

// Query all bids for a specific auction
const auctionId = "auction1";
console.log(`\nBids for Auction ID: ${auctionId}`);
db.bids.find({ auction_id: auctionId }).forEach((bid) => {
    printjson(bid);
});

// 4. Update Data
// Add a bid to the auction document (for real-time updates in the auction)
const newBid = {
    user_id: "user1",
    amount: 160,
    timestamp: new Date("2024-01-11T14:00:00Z"),
};

db.auctions.updateOne({ auction_id: "auction1" }, { $push: { bids: newBid }, $set: { current_price: 160 } });

console.log("\nUpdated Auction:");
printjson(db.auctions.findOne({ auction_id: "auction1" }));

// 5. Delete Data (Optional)
// Delete all bids for a specific auction
db.bids.deleteMany({ auction_id: "auction1" });
console.log("\nBids after deletion for Auction ID: auction1");
db.bids.find({ auction_id: "auction1" }).forEach((bid) => {
    printjson(bid);
});
