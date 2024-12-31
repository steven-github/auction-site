import { NextApiRequest, NextApiResponse } from "next";

import axios from "axios";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const { code } = req.body; // The authorization code from the callback

        if (!code) {
            res.status(400).json({ error: "Authorization code is required" });
            return;
        }

        try {
            const response = await axios.post(
                `https://${process.env.NEXT_PUBLIC_AUTH0_DOMAIN}/oauth/token`,
                {
                    grant_type: "authorization_code",
                    client_id: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID,
                    client_secret: process.env.AUTH0_CLIENT_SECRET,
                    redirect_uri: process.env.NEXT_PUBLIC_AUTH0_REDIRECT_URI,
                    code, // The authorization code
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            // Return the access token and other details to the client
            res.status(200).json(response.data);
        } catch (error: any) {
            console.error("Error exchanging token:", error.response?.data || error.message);
            res.status(401).json({
                error: "Unauthorized",
                details: error.response?.data || error.message,
            });
        }
    } else {
        res.status(405).json({ error: "Method Not Allowed" }); // Only allow POST requests
    }
}
