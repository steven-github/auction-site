import React, { useEffect, useState } from "react";

import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/router";

interface Bid {
  user_id: string;
  amount: number;
  timestamp: string;
}

interface Auction {
  _id: string;
  title: string;
  description: string;
  images: string[];
  starting_price: number;
  current_price: number;
  start_time: string;
  end_time: string;
  created_by: string;
  created_at: string;
  updated_at: string;
  bids: Bid[];
}

const AuctionDetail = () => {
  const router = useRouter();
  const { id } = router.query;

  const [auction, setAuction] = useState<Auction | null>(null);
  const [loading, setLoading] = useState(true);

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("es-CR", {
      style: "currency",
      currency: "CRC",
    }).format(value);

  const formatDate = (value: string) =>
    new Date(value).toLocaleString("en-GB", {
      dateStyle: "medium",
      timeStyle: "short",
    });

  useEffect(() => {
    if (!id) return;

    const fetchAuction = async () => {
      try {
        const res = await axios.get(`/api/auctions/${id}`);
        setAuction(res.data);
      } catch (error) {
        console.error("Error fetching auction:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAuction();
  }, [id]);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
      </div>
    );
  }

  if (!auction) {
    return (
      <div className="mt-12 text-center text-lg font-semibold text-gray-700">
        Auction not found.
      </div>
    );
  }

  return (
    <div className="mx-auto mt-8 max-w-4xl p-6">
      <button
        onClick={() => router.push("/auctions")}
        className="mb-6 rounded-md bg-gray-600 px-4 py-2 text-sm text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400"
      >
        ← Back to Auctions
      </button>

      <h1 className="mb-4 text-center text-3xl font-bold text-gray-800">
        {auction.title}
      </h1>

      <p className="mb-6 text-lg text-gray-700">
        <span className="font-semibold">Description:</span>{" "}
        {auction.description}
      </p>

      <div className="mb-8">
        <h2 className="mb-2 text-xl font-semibold text-gray-800">Images</h2>
        <div className="flex flex-wrap gap-4">
          {auction.images?.length > 0 ? (
            auction.images.map((image, index) => (
              <Image
                key={index}
                src={image}
                alt={`Auction Image ${index + 1}`}
                width={200}
                height={200}
                className="rounded-md object-cover shadow-md"
              />
            ))
          ) : (
            <p className="text-gray-500">No images available.</p>
          )}
        </div>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <p className="text-lg text-gray-700">
            <span className="font-bold">Starting Price:</span>{" "}
            {formatCurrency(auction.starting_price)}
          </p>
          <p className="text-lg text-gray-700">
            <span className="font-bold">Current Price:</span>{" "}
            {formatCurrency(auction.current_price)}
          </p>
        </div>
        <div>
          <p className="text-lg text-gray-700">
            <span className="font-bold">Start Time:</span>{" "}
            {formatDate(auction.start_time)}
          </p>
          <p className="text-lg text-gray-700">
            <span className="font-bold">End Time:</span>{" "}
            {formatDate(auction.end_time)}
          </p>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="mb-2 text-xl font-semibold text-gray-800">Bids</h2>
        {auction.bids?.length > 0 ? (
          <ul className="space-y-2">
            {auction.bids.map((bid, index) => (
              <li
                key={index}
                className="flex flex-wrap justify-between gap-4 rounded-md border bg-white p-4 shadow-sm sm:flex-nowrap"
              >
                <p className="text-gray-700">
                  <span className="font-semibold">User ID:</span> {bid.user_id}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Amount:</span>{" "}
                  {formatCurrency(bid.amount)}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Time:</span>{" "}
                  {formatDate(bid.timestamp)}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No bids placed yet.</p>
        )}
      </div>

      <div className="space-y-1 text-sm text-gray-700">
        <p>
          <span className="font-bold">Created By:</span> {auction.created_by}
        </p>
        <p>
          <span className="font-bold">Created At:</span>{" "}
          {formatDate(auction.created_at)}
        </p>
        <p>
          <span className="font-bold">Updated At:</span>{" "}
          {formatDate(auction.updated_at)}
        </p>
      </div>
    </div>
  );
};

export default AuctionDetail;
