import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI as string; // Ensure URI is not undefined
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!process.env.MONGODB_URI) {
    throw new Error("Please add your MongoDB URI to .env.local");
}

if (process.env.NODE_ENV === "development") {
    // In development mode, use the global variable to preserve a MongoDB connection
    if (!global._mongoClientPromise) {
        client = new MongoClient(uri, options);
        global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
} else {
    // In production, always create a new client
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
}

export async function connectToDatabase() {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB); // Use your DB name from the environment variable
    return { client, db };
}
