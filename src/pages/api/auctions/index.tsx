import { connectToDatabase } from "@/utils/mongodb";

export const config = {
    api: {
        bodyParser: {
            sizeLimit: "10mb", // Increase payload size limit to 10 MB
        },
    },
};

export default async function handler(req, res) {
    const { db } = await connectToDatabase();
    const collection = db.collection("auctions");

    switch (req.method) {
        case "GET": // Get all auctions
            try {
                const { email } = req.query; // Extract email from query parameters

                // Build the filter condition
                const filter = email ? { email } : {};

                const auctions = await collection.find(filter).toArray();
                return res.status(200).json(auctions);
            } catch (error) {
                console.error("Error fetching auctions:", error);
                return res.status(500).json({ message: "Error fetching auctions", error });
            }

        case "POST": // Create a new auction
            try {
                const auction = req.body;

                // Basic validation
                if (!auction.title || !auction.description || !auction.starting_price) {
                    return res.status(400).json({ message: "Missing required fields: title, description, or starting_price" });
                }

                auction.created_at = new Date().toISOString();
                auction.updated_at = new Date().toISOString();

                // Insert the auction into the collection
                const result = await collection.insertOne(auction);
                return res.status(201).json({ message: "Auction created", id: result.insertedId });
            } catch (error) {
                console.error("Error creating auction:", error);
                return res.status(500).json({ message: "Error creating auction", error });
            }

        default:
            res.setHeader("Allow", ["GET", "POST"]);
            return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
