import { GridFSBucket, MongoClient, ObjectId } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB;

export default async function handler(req, res) {
    if (req.method === "GET") {
        const { id } = req.query;

        const client = new MongoClient(uri);

        try {
            await client.connect();
            const db = client.db(dbName);
            const bucket = new GridFSBucket(db);

            const downloadStream = bucket.openDownloadStream(new ObjectId(id));

            res.setHeader("Content-Type", "image/jpeg"); // Set appropriate MIME type
            downloadStream.pipe(res);

            downloadStream.on("error", () => {
                res.status(404).send("Image not found");
            });
        } catch (err) {
            console.error("Error fetching image:", err);
            res.status(500).json({ error: "Failed to fetch image" });
        } finally {
            client.close();
        }
    } else {
        res.setHeader("Allow", ["GET"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
