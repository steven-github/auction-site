// MongoDB Playground
// This script sets up the database, creates collections, inserts sample data, demonstrates relationships, and performs queries.

// Switch to the target database (create if it doesn't exist)
use("auction_db");

// Drop existing collections (optional)
db.users.drop();
db.auctions.drop();
db.bids.drop();

// Drop the database if you want to reset it (use carefully in production)
// db.dropDatabase();

// 1. Create Collections
// Explicitly create collections for clarity
db.createCollection("users");
db.createCollection("auctions");
db.createCollection("bids");

// 2. Insert Sample Data

// Insert Users
db.users.insertMany([
    {
        given_name: "Steven Sanchez",
        family_name: "Marin",
        nickname: "stvn20",
        name: "Steven Sanchez Marin",
        picture: "https://lh3.googleusercontent.com/a/ACg8ocJTJShusRlc9wCE_46YcmtXlHF7eT_HBosbm0G8c1GtOIwfnVA8Ww=s96-c",
        updated_at: new Date("2024-01-01T12:00:00Z"),
        email: "stvn20@gmail.com",
        email_verified: true,
        sub: "google-oauth2|100786993613078818868",
        sid: "glWYTn5q9NPfKQVci9ye2h4gMAe6DEWP",
    },
    {
        given_name: "John",
        family_name: "Doe",
        nickname: "johndoe",
        name: "John Doe",
        picture: "https://lh3.googleusercontent.com/a/ACg8ocJTJShusRlc9wCE_46YcmtXlHF7eT_HBosbm0G8c1GtOIwfnVA8Ww=s96-c",
        updated_at: new Date("2024-01-02T15:30:00Z"),
        email: "johndoe@gmail.com",
        email_verified: true,
        sub: "google-oauth2|100786993613078818869", // Made unique
        sid: "glWYTn5q9NPfKQVci9ye2h4gMAe6DEWQ",
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
        seller_sid: "glWYTn5q9NPfKQVci9ye2h4gMAe6DEWQ", // Links to the seller
        bids: [], // Placeholder for bids
        created_at: new Date(),
    },
    {
        auction_id: "auction2",
        title: "Antique Vase",
        description: "An antique vase from the 18th century.",
        starting_price: 200,
        current_price: 250,
        end_time: new Date("2024-01-20T18:00:00Z"),
        seller_sid: "glWYTn5q9NPfKQVci9ye2h4gMAe6DEWP",
        bids: [],
        created_at: new Date(),
    },
]);

// Insert Bids
db.bids.insertMany([
    {
        bid_id: "bid1",
        auction_id: "auction1",
        sid: "glWYTn5q9NPfKQVci9ye2h4gMAe6DEWP", // Links to bidder
        amount: 150,
        timestamp: new Date("2024-01-10T14:00:00Z"),
    },
    {
        bid_id: "bid2",
        auction_id: "auction2",
        sid: "glWYTn5q9NPfKQVci9ye2h4gMAe6DEWQ",
        amount: 250,
        timestamp: new Date("2024-01-11T10:30:00Z"),
    },
]);

// 3. Queries

// Query all users
print("\nAll Users:");
db.users.find().forEach(printjson);

// Query all auctions
print("\nAll Auctions:");
db.auctions.find().forEach(printjson);

// Query all bids for a specific auction
const auctionId = "auction1";
print(`\nBids for Auction ID: ${auctionId}`);
db.bids.find({ auction_id: auctionId }).forEach(printjson);

// 4. Update Data

// Add a bid to the auction document (for real-time updates in the auction)
const newBid = {
    sid: "glWYTn5q9NPfKQVci9ye2h4gMAe6DEWP",
    amount: 160,
    timestamp: new Date("2024-01-11T14:00:00Z"),
};

// Update auction document and current price
db.auctions.updateOne({ auction_id: "auction1" }, { $push: { bids: newBid }, $set: { current_price: 160 } });

print("\nUpdated Auction:");
printjson(db.auctions.findOne({ auction_id: "auction1" }));

// 5. Aggregate Data

// Get total bids per auction
print("\nTotal Bids per Auction:");
db.bids.aggregate([{ $group: { _id: "$auction_id", total_bids: { $sum: 1 } } }]).forEach(printjson);

// Get total amount of bids per user
print("\nTotal Amount of Bids per User:");
db.bids.aggregate([{ $group: { _id: "$sid", total_amount: { $sum: "$amount" } } }]).forEach(printjson);

// 6. Delete Data (Optional)

// Delete all bids for a specific auction
// db.bids.deleteMany({ auction_id: "auction1" });
// print("\nBids after deletion for Auction ID: auction1");
// db.bids.find({ auction_id: "auction1" }).forEach(printjson);
