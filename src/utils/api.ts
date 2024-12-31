import axios from "axios";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

// Add an interceptor for adding auth tokens if needed
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
        debugger;
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
