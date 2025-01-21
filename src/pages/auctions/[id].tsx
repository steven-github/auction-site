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
      <div className="flex items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  if (!auction) {
    return (
      <div className="mt-8 text-center text-lg font-medium">
        Auction not found
      </div>
    );
  }

  return (
    <div className="mx-auto mt-8 max-w-4xl p-6">
      <button
        onClick={() => router.push("/auctions")}
        className="mb-4 rounded-md bg-gray-500 px-4 py-2 text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
      >
        Back to Auctions
      </button>
      <h1 className="mb-6 text-center text-3xl font-bold text-gray-800">
        {auction.title}
      </h1>

      <p className="mb-4 text-lg text-gray-700">
        <span className="font-bold">Description:</span> {auction.description}
      </p>

      <div className="mb-4">
        <h2 className="mb-2 text-xl font-semibold">Images</h2>
        <div className="flex flex-wrap gap-4">
          {auction.images.map((image: string, index: number) => (
            <Image
              key={index}
              src={image}
              alt={`Auction Image ${index + 1}`}
              className="h-32 w-32 rounded-md object-cover shadow-md"
              width={200}
              height={200}
            />
          ))}
        </div>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-4">
        <div>
          <p className="text-lg text-gray-700">
            <span className="font-bold">Starting Price:</span> $
            {auction.starting_price}
          </p>
          <p className="text-lg text-gray-700">
            <span className="font-bold">Current Price:</span> $
            {auction.current_price}
          </p>
        </div>
        <div>
          <p className="text-lg text-gray-700">
            <span className="font-bold">Start Time:</span>{" "}
            {new Date(auction.start_time).toLocaleString()}
          </p>
          <p className="text-lg text-gray-700">
            <span className="font-bold">End Time:</span>{" "}
            {new Date(auction.end_time).toLocaleString()}
          </p>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="mb-2 text-xl font-semibold">Bids</h2>
        {auction.bids.length > 0 ? (
          <ul className="space-y-2">
            {auction.bids.map((bid: any, index: number) => (
              <li
                key={index}
                className="flex items-center justify-between rounded-md bg-white p-4 shadow-md"
              >
                <p className="text-gray-700">
                  <span className="font-bold">User ID:</span> {bid.user_id}
                </p>
                <p className="text-gray-700">
                  <span className="font-bold">Amount:</span> ${bid.amount}
                </p>
                <p className="text-gray-700">
                  <span className="font-bold">Timestamp:</span>{" "}
                  {new Date(bid.timestamp).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-700">No bids yet.</p>
        )}
      </div>

      <p className="text-sm text-gray-700">
        <span className="font-bold">Created By:</span> {auction.created_by}
      </p>
      <p className="text-sm text-gray-700">
        <span className="font-bold">Created At:</span>{" "}
        {new Date(auction.created_at).toLocaleString()}
      </p>
      <p className="text-sm text-gray-700">
        <span className="font-bold">Updated At:</span>{" "}
        {new Date(auction.updated_at).toLocaleString()}
      </p>
    </div>
  );
};

export default AuctionDetail;
