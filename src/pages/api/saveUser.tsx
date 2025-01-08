import axios from "axios";

// Ensure this is a default export
export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    try {
        const response = await axios.post("http://localhost:8000/api/v1/auctions/save-user", req.body, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        return res.status(response.status).json(response.data);
    } catch (error: any) {
        console.error("Error saving user:", error.response?.data || error.message);
        return res.status(error.response?.status || 500).json(error.response?.data || { message: "Internal Server Error" });
    }
}
