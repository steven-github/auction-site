import AuctionCard from "./AuctionCard";
import React from "react";

interface Auction {
    id: string;
    title: string;
    description: string;
    currentBid: number;
    endTime: string;
}

interface AuctionListProps {
    auctions: Auction[];
    onAuctionClick: (id: string) => void;
}

const AuctionList: React.FC<AuctionListProps> = ({ auctions, onAuctionClick }) => {
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {auctions.map((auction) => (
                <AuctionCard
                    key={auction.id}
                    title={auction.title}
                    description={auction.description}
                    currentBid={auction.currentBid}
                    endTime={auction.endTime}
                    onClick={() => onAuctionClick(auction.id)}
                />
            ))}
        </div>
    );
};

export default AuctionList;
