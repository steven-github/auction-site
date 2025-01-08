import React, { useEffect, useState } from "react";

import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/router";

const AuctionDetail = () => {
    const router = useRouter();
    const { id } = router.query;

    const [auction, setAuction] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            const fetchAuctionDetails = async () => {
                try {
                    const response = await axios.get(`/api/auctions/${id}`);
                    setAuction(response.data);
                    setLoading(false);
                } catch (error) {
                    console.error("Error fetching auction details:", error);
                    setLoading(false);
                }
            };
            fetchAuctionDetails();
        }
    }, [id]);

    if (loading) {
        return (
            <div className='flex justify-center items-center'>
                <div className='w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin'></div>
            </div>
        );
    }

    if (!auction) {
        return <div className='text-center mt-8 text-lg font-medium'>Auction not found</div>;
    }

    return (
        <div className='max-w-4xl mx-auto p-6 mt-8'>
            <button
                onClick={() => router.push("/auctions")}
                className='bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 mb-4'
            >
                Back to Auctions
            </button>
            <h1 className='text-3xl font-bold mb-6 text-center text-gray-800'>{auction.title}</h1>

            <p className='text-lg text-gray-700 mb-4'>
                <span className='font-bold'>Description:</span> {auction.description}
            </p>

            <div className='mb-4'>
                <h2 className='text-xl font-semibold mb-2'>Images</h2>
                <div className='flex gap-4 flex-wrap'>
                    {auction.images.map((image: string, index: number) => (
                        <Image
                            key={index}
                            src={image}
                            alt={`Auction Image ${index + 1}`}
                            className='w-32 h-32 object-cover rounded-md shadow-md'
                            width={200}
                            height={200}
                        />
                    ))}
                </div>
            </div>

            <div className='grid grid-cols-2 gap-4 mb-6'>
                <div>
                    <p className='text-lg text-gray-700'>
                        <span className='font-bold'>Starting Price:</span> ${auction.starting_price}
                    </p>
                    <p className='text-lg text-gray-700'>
                        <span className='font-bold'>Current Price:</span> ${auction.current_price}
                    </p>
                </div>
                <div>
                    <p className='text-lg text-gray-700'>
                        <span className='font-bold'>Start Time:</span> {new Date(auction.start_time).toLocaleString()}
                    </p>
                    <p className='text-lg text-gray-700'>
                        <span className='font-bold'>End Time:</span> {new Date(auction.end_time).toLocaleString()}
                    </p>
                </div>
            </div>

            <div className='mb-6'>
                <h2 className='text-xl font-semibold mb-2'>Bids</h2>
                {auction.bids.length > 0 ? (
                    <ul className='space-y-2'>
                        {auction.bids.map((bid: any, index: number) => (
                            <li key={index} className='flex justify-between items-center bg-white p-4 rounded-md shadow-md'>
                                <p className='text-gray-700'>
                                    <span className='font-bold'>User ID:</span> {bid.user_id}
                                </p>
                                <p className='text-gray-700'>
                                    <span className='font-bold'>Amount:</span> ${bid.amount}
                                </p>
                                <p className='text-gray-700'>
                                    <span className='font-bold'>Timestamp:</span> {new Date(bid.timestamp).toLocaleString()}
                                </p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className='text-gray-700'>No bids yet.</p>
                )}
            </div>

            <p className='text-gray-700 text-sm'>
                <span className='font-bold'>Created By:</span> {auction.created_by}
            </p>
            <p className='text-gray-700 text-sm'>
                <span className='font-bold'>Created At:</span> {new Date(auction.created_at).toLocaleString()}
            </p>
            <p className='text-gray-700 text-sm'>
                <span className='font-bold'>Updated At:</span> {new Date(auction.updated_at).toLocaleString()}
            </p>
        </div>
    );
};

export default AuctionDetail;
