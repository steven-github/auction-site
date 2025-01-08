import Image from "next/image";
import Link from "next/link";

export default function AuctionCard({ auction, onDelete, viewMode }) {
    return (
        <div
            className={
                viewMode === "grid"
                    ? "block bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
                    : "flex bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
            }
        >
            {/* Image */}
            <div className={viewMode === "list" ? "w-1/3" : ""}>
                {auction.images && auction.images.length > 0 ? (
                    <Image
                        src={auction.images[0]}
                        alt={auction.title}
                        className={viewMode === "grid" ? "w-full h-48 object-cover" : "w-full h-full object-cover"}
                        width={185}
                        height={185}
                    />
                ) : (
                    <div
                        className={
                            viewMode === "grid"
                                ? "w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500"
                                : "w-full h-full bg-gray-200 flex items-center justify-center text-gray-500"
                        }
                    >
                        No Image
                    </div>
                )}
            </div>

            {/* Content */}
            <div className={viewMode === "list" ? "w-2/3 p-4 flex flex-col justify-between" : "p-4"}>
                <h2 className={(viewMode === "list" ? "line-clamp-2" : " line-clamp-5") + " text-xl font-semibold text-gray-800"}>{auction.title}</h2>
                <p className='text-gray-600 mt-2'>{auction.description}</p>
                <div className='mt-4 flex justify-between items-center'>
                    <p className='text-gray-800 font-bold'>${auction.current_price}</p>
                    <p className='text-sm text-gray-500'>Ends: {new Date(auction.end_time).toLocaleString()}</p>
                </div>
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
            </div>
        </div>
    );
}
