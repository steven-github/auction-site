import { useEffect, useState } from "react";

import axios from "axios";

interface Auction {
    id: string;
    title: string;
    description: string;
    currentBid: number;
    endTime: string;
}

const useAuctions = (apiUrl: string) => {
    const [auctions, setAuctions] = useState<Auction[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAuctions = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(apiUrl);
                setAuctions(response.data);
            } catch (err) {
                setError(err instanceof Error ? err.message : "An error occurred");
            } finally {
                setIsLoading(false);
            }
        };

        fetchAuctions();
    }, [apiUrl]);

    return { auctions, isLoading, error };
};

export default useAuctions;
