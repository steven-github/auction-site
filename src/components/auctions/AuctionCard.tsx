import React from "react";

interface AuctionCardProps {
    title: string;
    description: string;
    currentBid: number;
    endTime: string;
    onClick: () => void;
}

const AuctionCard: React.FC<AuctionCardProps> = ({ title, description, currentBid, endTime, onClick }) => {
    return (
        <div className='p-4 border rounded-lg shadow-md cursor-pointer hover:shadow-lg' onClick={onClick}>
            <h2 className='text-lg font-bold'>{title}</h2>
            <p className='text-sm text-gray-600'>{description}</p>
            <p className='mt-2'>
                <span className='font-semibold'>Current Bid:</span> ${currentBid.toFixed(2)}
            </p>
            <p className='text-sm text-gray-500'>
                <span className='font-semibold'>Ends At:</span> {new Date(endTime).toLocaleString()}
            </p>
        </div>
    );
};

export default AuctionCard;
