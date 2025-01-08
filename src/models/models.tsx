export interface User {
    id?: string; // MongoDB ObjectId as a string
    given_name: string;
    family_name: string;
    nickname?: string; // Optional
    name: string;
    picture?: string; // Optional
    updated_at: string; // ISO 8601 string format
    email: string; // Valid email
    email_verified: boolean;
    sub: string;
    sid: string;
    created_at: string; // ISO 8601 string format
}

export interface Bid {
    user_id: string;
    amount: number;
    timestamp: string; // ISO 8601 format
    sid: string;
}

export interface Auction {
    _id?: string; // MongoDB ObjectId (optional for new auctions)
    title: string;
    description: string;
    images: string[]; // Array of image URLs
    starting_price: number;
    current_price: number;
    start_time: string; // ISO 8601 format
    end_time: string; // ISO 8601 format
    created_by: string; // User ID of creator
    bids: Bid[]; // Array of bids
    created_at: string; // ISO 8601 format
    updated_at: string; // ISO 8601 format
}
