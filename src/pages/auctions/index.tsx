import { useEffect, useState } from "react";

import AuctionCard from "@/components/AuctionCard";
import Link from "next/link";
import axios from "axios";

export default function AuctionsList() {
    const [auctions, setAuctions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [viewMode, setViewMode] = useState("grid"); // "grid" or "list"

    useEffect(() => {
        axios
            .get("/api/auctions")
            .then((response) => {
                setAuctions(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching auctions:", error);
                setLoading(false);
            });
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this auction?")) {
            return;
        }

        try {
            await axios.delete(`/api/auctions/${id}`);
            setAuctions((prev) => prev.filter((auction) => auction._id !== id));
            alert("Auction deleted successfully.");
        } catch (error) {
            console.error("Error deleting auction:", error);
            alert("Failed to delete auction.");
        }
    };

    if (loading) {
        return (
            <div className='flex justify-center items-center'>
                <div className='w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin'></div>
            </div>
        );
    }

    return (
        <div className='max-w-7xl mx-auto p-6'>
            <div className='flex justify-between items-center mb-6'>
                <h1 className='text-3xl font-bold text-gray-800'>Auctions</h1>
                <div className='flex items-center space-x-4'>
                    <button
                        className={`py-2 px-4 rounded-md ${viewMode === "grid" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                        onClick={() => setViewMode("grid")}
                    >
                        Grid
                    </button>
                    <button
                        className={`py-2 px-4 rounded-md ${viewMode === "list" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                        onClick={() => setViewMode("list")}
                    >
                        List
                    </button>
                    <Link href='/auctions/new'>
                        <button className='bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400'>
                            Create Auction
                        </button>
                    </Link>
                </div>
            </div>

            <div className={viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" : "flex flex-col space-y-4"}>
                {auctions.map((auction) => (
                    <AuctionCard
                        key={auction._id}
                        auction={auction}
                        onDelete={handleDelete}
                        viewMode={viewMode} // Pass the view mode
                    />
                ))}
            </div>
        </div>
    );
}
