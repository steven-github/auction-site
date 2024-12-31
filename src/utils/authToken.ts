import axios from "axios";

const getAuth0Token = async () => {
    try {
        const response = await axios.post(
            "https://dev-zxz5y0qz5uavkux0.us.auth0.com/oauth/token",
            {
                grant_type: "client_credentials",
                client_id: process.env.AUTH0_CLIENT_ID,
                client_secret: process.env.AUTH0_CLIENT_SECRET,
                audience: process.env.AUTH0_AUDIENCE,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        return response.data.access_token;
    } catch (error: any) {
        console.error("Error fetching Auth0 token:", error.response?.data || error.message);
        throw new Error("Failed to fetch Auth0 token. Check your credentials.");
    }
};

export default getAuth0Token;
