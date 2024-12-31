import React from "react";
import useAuctions from "../../hooks/useAuctions";

const AuctionsPage = () => {
    const { auctions, isLoading, error } = useAuctions("/api/auctions");

    if (isLoading) return <p>Loading auctions...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h1>Available Auctions</h1>
            <ul>
                {auctions.map((auction) => (
                    <li key={auction.id}>
                        {auction.title} - Current Bid: ${auction.currentBid}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AuctionsPage;
