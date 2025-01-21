import { faBars, faGrip } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

import AuctionCard from "@/components/AuctionCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import axios from "axios";

export default function AuctionsList() {
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("grid"); // "grid" or "list"

  useEffect(() => {
    if (localStorage.getItem("viewMode")) {
      setViewMode(localStorage.getItem("viewMode") || "grid");
    }
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

  const handleViewModeChange = (mode: string) => {
    localStorage.setItem("viewMode", mode);
    setViewMode(mode);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Auctions</h1>

        <div className="flex items-center space-x-4">
          <div className="inline-flex rounded-md shadow-sm" role="group">
            <button
              type="button"
              className={`inline-flex items-center gap-2 rounded-s-lg border border-gray-200 px-4 py-2 text-sm font-medium hover:bg-gray-100 hover:text-blue-700 focus:z-10 ${
                viewMode === "grid"
                  ? "bg-gray-100 text-blue-700"
                  : "bg-white text-gray-900"
              }`}
              onClick={() => handleViewModeChange("grid")}
            >
              <FontAwesomeIcon icon={faGrip} size="sm" />
              Grid
            </button>
            <button
              type="button"
              className={`inline-flex items-center gap-2 rounded-e-lg border-b border-r border-t border-gray-200 px-4 py-2 text-sm font-medium hover:bg-gray-100 hover:text-blue-700 focus:z-10 ${
                viewMode === "list"
                  ? "bg-gray-100 text-blue-700"
                  : "bg-white text-gray-900"
              }`}
              onClick={() => handleViewModeChange("list")}
            >
              <FontAwesomeIcon icon={faBars} size="sm" />
              List
            </button>
          </div>
          <Link href="/auctions/new">
            <button className="mb-2 me-2 rounded-full bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300">
              Create Auction
            </button>
          </Link>
        </div>
      </div>

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
            viewMode={viewMode} // Pass the view mode
          />
        ))}
      </div>
    </div>
  );
}
