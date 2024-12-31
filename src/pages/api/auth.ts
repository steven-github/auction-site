import { NextApiRequest, NextApiResponse } from "next";

import axios from "axios";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const { code } = req.body;

        try {
            const tokenResponse = await axios.post(
                `https://${process.env.NEXT_PUBLIC_AUTH0_DOMAIN}/oauth/token`,
                {
                    grant_type: "authorization_code",
                    client_id: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID,
                    client_secret: process.env.AUTH0_CLIENT_SECRET,
                    redirect_uri: process.env.NEXT_PUBLIC_AUTH0_REDIRECT_URI,
                    code,
                },
                { headers: { "Content-Type": "application/json" } }
            );

            res.status(200).json(tokenResponse.data);
        } catch (error: any) {
            console.error("Token exchange error:", error.response?.data || error.message);
            res.status(401).json({ error: "Unauthorized" });
        }
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }
}
