import Image from "next/image";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function AuctionCard({ auction, onDelete, viewMode }: any) {
    const { user, error, isLoading } = useUser();

    // Function to format price to Costa Rican colones
    const formatToCRC = (amount: number) =>
        new Intl.NumberFormat("es-CR", {
            style: "currency",
            currency: "CRC",
        }).format(amount);

    return (
        <div
            className={`bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 ${viewMode === "grid" ? "block" : "flex"}`}
        >
            {/* Image */}
            <div className={viewMode === "list" ? "w-1/3" : ""}>
                {auction.images && auction.images.length > 0 ? (
                    <Image
                        src={auction.images[0]}
                        alt={auction.title}
                        className={`w-full max-h-[265px] object-cover p-4 ${viewMode === "grid" ? "h-48" : "h-full"}`}
                        width={185}
                        height={185}
                    />
                ) : (
                    <div className={`w-full bg-gray-200 flex items-center justify-center text-gray-500 ${viewMode === "grid" ? "h-48" : "h-full"}`}>
                        No Image
                    </div>
                )}
            </div>

            {/* Content */}
            <div className={viewMode === "list" ? "w-2/3 p-4 flex flex-col justify-between" : "p-4"}>
                <h2 className={(viewMode === "list" ? "line-clamp-2" : " line-clamp-5") + " text-xl font-semibold text-gray-800"}>{auction.title}</h2>
                <p className='mt-2 text-gray-600 line-clamp-3'>{auction.description}</p>
                <div className={`mt-4 flex justify-between ${viewMode === "grid" ? "flex-col items-end" : "flex-row items-center"}`}>
                    <p className='font-bold text-gray-800'>{formatToCRC(auction.current_price)}</p>
                    <p className='text-sm text-gray-500'>Ends: {new Date(auction.end_time).toLocaleString()}</p>
                </div>
                {user && (
                    <div className={viewMode === "list" ? "mt-4 flex justify-end gap-2" : "flex justify-between gap-2 items-center mt-4 border-t pt-2"}>
                        <Link href={`/auctions/${auction._id}`}>
                            <button className='py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 transition-all'>
                                View
                            </button>
                        </Link>
                        <Link href={`/auctions/edit/${auction._id}`}>
                            <button className='py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 transition-all'>
                                Edit
                            </button>
                        </Link>
                        <button
                            onClick={() => onDelete(auction._id)}
                            className='py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-red-700 focus:z-10 focus:ring-4 focus:ring-gray-100 transition-all'
                        >
                            Delete
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
