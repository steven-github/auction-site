import { ObjectId } from "mongodb";
import { connectToDatabase } from "../../../utils/mongodb";

export default async function handler(req, res) {
    const { id } = req.query;
    const { db } = await connectToDatabase();
    const collection = db.collection("auctions");

    switch (req.method) {
        case "GET": // Get a single auction by ID
            const auction = await collection.findOne({ _id: new ObjectId(id) });
            if (!auction) return res.status(404).json({ message: "Auction not found" });
            return res.status(200).json(auction);

        case "PUT": // Update an auction
            try {
                const updates = req.body;
                const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: updates });
                return res.status(200).json({ message: "Auction updated", result });
            } catch (error) {
                return res.status(500).json({ message: "Error updating auction", error });
            }

        case "DELETE": // Delete an auction
            try {
                const result = await collection.deleteOne({ _id: new ObjectId(id) });
                return res.status(200).json({ message: "Auction deleted", result });
            } catch (error) {
                return res.status(500).json({ message: "Error deleting auction", error });
            }

        default:
            res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
            return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
