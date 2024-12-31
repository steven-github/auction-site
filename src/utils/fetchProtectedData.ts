import api from "./api";
import getAuth0Token from "./authToken";

const fetchProtectedData = async (): Promise<any> => {
    try {
        // Fetch the Auth0 token
        const token = await getAuth0Token();

        // Make the API call with the token
        const response = await api.get("/protected-resource", {
            headers: {
                Authorization: `Bearer ${token}`, // Attach the token in the Authorization header
            },
        });

        return response.data;
    } catch (error: any) {
        console.error("Error fetching protected data:", error.response?.data || error.message);
        throw new Error("Failed to fetch protected resource.");
    }
};

export default fetchProtectedData;
