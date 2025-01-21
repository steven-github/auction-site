import React, { useState } from "react";

interface BidFormProps {
    currentBid: number;
    onSubmit: (bid: number) => void;
}

const BidForm: React.FC<BidFormProps> = ({ currentBid, onSubmit }) => {
    const [bidAmount, setBidAmount] = useState<number>(currentBid + 1);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (bidAmount > currentBid) {
            onSubmit(bidAmount);
        } else {
            alert("Bid amount must be higher than the current bid!");
        }
    };

    return (
        <form onSubmit={handleSubmit} className='mt-4'>
            <div className='flex items-center space-x-2'>
                <input
                    type='number'
                    value={bidAmount}
                    onChange={(e) => setBidAmount(parseFloat(e.target.value))}
                    className='w-full p-2 border rounded-lg'
                    min={currentBid + 1}
                    step={1}
                />
                <button type='submit' className='px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600'>
                    Place Bid
                </button>
            </div>
        </form>
    );
};

export default BidForm;
