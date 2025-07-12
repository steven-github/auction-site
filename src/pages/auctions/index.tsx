import { faBars, faGrip } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

import AuctionCard from "@/components/AuctionCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import axios from "axios";
import { useUser } from "@auth0/nextjs-auth0/client";

type Auction = {
  _id: string;
  title: string;
  description: string;
  image: string;
  startingPrice: number;
  endTime: string;
  createdAt: string;
  owner: {
    _id: string;
    name: string;
    email: string;
  };
  bids: {
    _id: string;
    amount: number;
    bidder: {
      _id: string;
      name: string;
      email: string;
    };
    createdAt: string;
  };
};

export default function AuctionsList() {
  const { user, isLoading: authLoading } = useUser();
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Load saved view mode from localStorage
  useEffect(() => {
    const savedMode = localStorage.getItem("viewMode");
    if (savedMode === "list" || savedMode === "grid") {
      setViewMode(savedMode);
    }
  }, []);

  // Fetch auctions when user is available
  useEffect(() => {
    if (authLoading) return;

    const fetchAuctions = async () => {
      try {
        const response = await axios.get("/api/auctions", {
          headers: {
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
            "If-None-Match": "",
          },
        });
        setAuctions(response.data);
      } catch (err) {
        console.error("Error fetching auctions:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAuctions();
  }, [authLoading]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this auction?")) return;

    try {
      await axios.delete(`/api/auctions/${id}`);
      setAuctions((prev) => prev.filter((a) => a._id !== id));
      alert("Auction deleted successfully.");
    } catch (err) {
      console.error("Error deleting auction:", err);
      alert("Failed to delete auction.");
    }
  };

  const handleViewModeChange = (mode: "grid" | "list") => {
    setViewMode(mode);
    localStorage.setItem("viewMode", mode);
  };

  if (loading || authLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-7xl p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Auctions</h1>
        <div className="flex items-center gap-4">
          {auctions.length > 0 && (
            <div className="inline-flex rounded-md shadow-sm" role="group">
              {["grid", "list"].map((mode) => (
                <button
                  key={mode}
                  type="button"
                  className={`inline-flex items-center gap-2 border px-4 py-2 text-sm font-medium ${
                    mode === "grid" ? "rounded-s-lg" : "rounded-e-lg border-l-0"
                  } ${
                    viewMode === mode
                      ? "bg-gray-100 text-blue-700"
                      : "bg-white text-gray-900 hover:bg-gray-100 hover:text-blue-700"
                  } border-gray-200 focus:z-10`}
                  onClick={() => handleViewModeChange(mode as "grid" | "list")}
                >
                  <FontAwesomeIcon
                    icon={mode === "grid" ? faGrip : faBars}
                    size="sm"
                  />
                  {mode.charAt(0).toUpperCase() + mode.slice(1)}
                </button>
              ))}
            </div>
          )}
          {user && (
            <Link href="/auctions/new">
              <button className="rounded-full bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300">
                Create Auction
              </button>
            </Link>
          )}
        </div>
      </div>

      {auctions.length > 0 ? (
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
              : "flex flex-col space-y-4"
          }
        >
          {auctions.map((auction) => (
            <AuctionCard
              key={auction._id}
              auction={auction}
              onDelete={handleDelete}
              viewMode={viewMode}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">No auctions found.</p>
      )}
    </div>
  );
}
