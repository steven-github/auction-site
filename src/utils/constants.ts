export const API_ENDPOINTS = {
    AUCTIONS: "/auctions",
    AUTH: "/auth",
};

export const WEBSOCKET_URL = process.env.NEXT_PUBLIC_WEBSOCKET_URL || "ws://localhost:8000/ws";

export const DATE_FORMAT = "MMM DD, YYYY h:mm A";
