import Image from "next/image";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";

type Auction = {
    _id: string;
    title: string;
    description: string;
    current_price: number;
    end_time: string;
    images: string[];
};

type Props = {
    auction: Auction;
    onDelete: (id: string) => void;
    viewMode: "grid" | "list";
};

export default function AuctionCard({ auction, onDelete, viewMode }: Props) {
    const { user } = useUser();

    const formatToCRC = (amount: number) =>
        new Intl.NumberFormat("es-CR", {
            style: "currency",
            currency: "CRC",
        }).format(amount);

    const isGrid = viewMode === "grid";
    const isList = viewMode === "list";

    return (
        <div className={`bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 ${isGrid ? "block" : "flex"}`}>
            {/* Image Section */}
            <div className={isList ? "w-1/3" : ""}>
                {auction.images?.length > 0 ? (
                    <Image
                        src={auction.images[0]}
                        alt={auction.title}
                        width={185}
                        height={185}
                        className={`w-full object-cover p-4 ${isGrid ? "h-48 max-h-[265px]" : "h-full"}`}
                    />
                ) : (
                    <div className={`w-full bg-gray-200 flex items-center justify-center text-gray-500 ${isGrid ? "h-48" : "h-full"}`}>No Image</div>
                )}
            </div>

            {/* Content Section */}
            <div className={`p-4 ${isList ? "w-2/3 flex flex-col justify-between" : ""}`}>
                <h2 className={`text-xl font-semibold text-gray-800 ${isList ? "line-clamp-2" : "line-clamp-5"}`}>{auction.title}</h2>
                <p className='mt-2 text-gray-600 line-clamp-3'>{auction.description}</p>

                <div className={`mt-4 flex justify-between ${isGrid ? "flex-col items-end" : "flex-row items-center"}`}>
                    <p className='font-bold text-gray-800'>{formatToCRC(auction.current_price)}</p>
                    <p className='text-sm text-gray-500'>Ends: {new Date(auction.end_time).toLocaleString()}</p>
                </div>

                <div className={`mt-4 gap-2 ${isList ? "flex justify-end" : "flex justify-between items-center border-t pt-2"}`}>
                    <Link href={`/auctions/${auction._id}`}>
                        <button className='py-2.5 px-5 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:z-10 focus:ring-4 focus:ring-gray-100 transition-all'>
                            View
                        </button>
                    </Link>
                    {user && (
                        <>
                            <Link href={`/auctions/edit/${auction._id}`}>
                                <button className='py-2.5 px-5 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:z-10 focus:ring-4 focus:ring-gray-100 transition-all'>
                                    Edit
                                </button>
                            </Link>
                            <button
                                onClick={() => onDelete(auction._id)}
                                className='py-2.5 px-5 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-red-700 focus:outline-none focus:z-10 focus:ring-4 focus:ring-gray-100 transition-all'
                            >
                                Delete
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
