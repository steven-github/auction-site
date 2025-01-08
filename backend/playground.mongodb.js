// Connect to MongoDB
use("auction_db");

// Clear existing data (optional for resetting)
db.users.drop();
db.auctions.drop();
db.bids.drop();
db.notifications.drop();
db.categories.drop();

// Insert User
db.users.insertOne({
    _id: ObjectId("64a7bff2f0b3941b4b5b1234"),
    given_name: "Steven",
    family_name: "Sanchez Marin",
    nickname: "stvn20",
    name: "Steven Sanchez Marin",
    picture: "https://lh3.googleusercontent.com/a/ACg8ocJTJShusRlc9wCE_46YcmtXlHF7eT_HBosbm0G8c1GtOIwfnVA8Ww=s96-c",
    updated_at: new Date("2024-01-01T12:00:00Z"),
    email: "stvn20@gmail.com",
    email_verified: true,
    sub: "google-oauth2|100786993613078818868", // Auth0 user ID
    sid: "glWYTn5q9NPfKQVci9ye2h4gMAe6DEWP", // Session ID
    created_at: new Date(),
    updated_at: new Date(),
});

// Insert Auction
db.auctions.insertOne({
    _id: ObjectId("64a7bff2f0b3941b4b5b5678"),
    title: "Vintage Guitar",
    description: "A rare vintage guitar from the 70s.",
    images: ["https://example.com/image1.jpg", "https://example.com/image2.jpg"],
    starting_price: 100,
    current_price: 250,
    start_time: new Date("2024-01-05T10:00:00Z"),
    end_time: new Date("2024-01-10T10:00:00Z"),
    created_by: ObjectId("64a7bff2f0b3941b4b5b1234"),
    bids: [
        {
            user_id: ObjectId("64a7bff2f0b3941b4b5b1234"),
            amount: 200,
            timestamp: new Date("2024-01-06T12:00:00Z"),
        },
        {
            user_id: ObjectId("64a7bff2f0b3941b4b5b5679"),
            amount: 250,
            timestamp: new Date("2024-01-06T13:00:00Z"),
        },
    ],
    created_at: new Date("2024-01-01T12:00:00Z"),
    updated_at: new Date("2024-01-06T13:00:00Z"),
});

// Insert Bids (if separate collection is used)
db.bids.insertMany([
    {
        _id: ObjectId("64a7bff2f0b3941b4b5b6789"),
        auction_id: ObjectId("64a7bff2f0b3941b4b5b5678"),
        user_id: ObjectId("64a7bff2f0b3941b4b5b1234"),
        amount: 200,
        timestamp: new Date("2024-01-06T12:00:00Z"),
    },
    {
        _id: ObjectId("64a7bff2f0b3941b4b5b6790"),
        auction_id: ObjectId("64a7bff2f0b3941b4b5b5678"),
        user_id: ObjectId("64a7bff2f0b3941b4b5b5679"),
        amount: 250,
        timestamp: new Date("2024-01-06T13:00:00Z"),
    },
]);

// Insert Notifications
db.notifications.insertOne({
    _id: ObjectId("64a7bff2f0b3941b4b5b7890"),
    user_id: ObjectId("64a7bff2f0b3941b4b5b1234"),
    auction_id: ObjectId("64a7bff2f0b3941b4b5b5678"),
    message: "You have been outbid on Vintage Guitar!",
    type: "outbid",
    is_read: false,
    timestamp: new Date("2024-01-06T13:05:00Z"),
});

// Insert Categories
db.categories.insertOne({
    _id: ObjectId("64a7bff2f0b3941b4b5b8901"),
    name: "Electronics",
    description: "Devices and gadgets",
    created_at: new Date(),
    updated_at: new Date(),
});

// Verify inserted data
print("Users:");
printjson(db.users.find().toArray());

print("\nAuctions:");
printjson(db.auctions.find().toArray());

print("\nBids:");
printjson(db.bids.find().toArray());

print("\nNotifications:");
printjson(db.notifications.find().toArray());

print("\nCategories:");
printjson(db.categories.find().toArray());
