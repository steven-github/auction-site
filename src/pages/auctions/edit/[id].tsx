import { useEffect, useState } from "react";

import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/router";

export default function EditAuction() {
    const router = useRouter();
    const { id } = router.query;

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        images: [],
        starting_price: 0,
        current_price: 0,
        created_by: "",
        bids: [],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    });

    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const [loading, setLoading] = useState(false); // Spinner for form submission
    const [fetching, setFetching] = useState(true); // Spinner for fetching data

    useEffect(() => {
        if (id) {
            setFetching(true); // Start spinner for data fetching
            axios
                .get(`/api/auctions/${id}`)
                .then((response) => {
                    const auction = response.data;
                    setFormData({
                        title: auction.title || "",
                        description: auction.description || "",
                        images: auction.images || [],
                        starting_price: auction.starting_price || 0,
                        current_price: auction.current_price || 0,
                        created_by: auction.created_by || "",
                        bids: auction.bids || [],
                        created_at: auction.created_at || new Date().toISOString(),
                        updated_at: new Date().toISOString(), // Set updated_at to now
                    });
                    setImagePreviews(auction.images || []);
                })
                .catch((error) => {
                    console.error("Error fetching auction:", error);
                })
                .finally(() => {
                    setFetching(false); // Stop spinner after data fetching
                });
        }
    }, [id]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;

        if (files) {
            Array.from(files).forEach((file) => {
                const reader = new FileReader();
                reader.onload = () => {
                    if (reader.result) {
                        setFormData((prev) => ({
                            ...prev,
                            images: [...prev.images, reader.result as string],
                        }));
                        setImagePreviews((prev) => [...prev, reader.result as string]);
                    }
                };
                reader.readAsDataURL(file);
            });
        }
    };

    const handleImageDelete = (index: number) => {
        setImagePreviews((prev) => prev.filter((_, i) => i !== index));
        setFormData((prev) => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index),
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true); // Start submission spinner

        try {
            await axios.put(`/api/auctions/${id}`, formData);
            alert("Auction updated successfully!");
            router.push("/auctions");
        } catch (error) {
            console.error("Error updating auction:", error);
            alert("Failed to update auction.");
        } finally {
            setLoading(false); // Stop submission spinner
        }
    };

    if (fetching) {
        return (
            <div className='flex items-center justify-center min-h-screen'>
                <div className='w-16 h-16 border-4 border-blue-500 rounded-full border-t-transparent animate-spin'></div>
            </div>
        );
    }

    return (
        <div className='max-w-4xl min-h-screen p-6 mx-auto bg-gray-100'>
            <button
                type='button'
                onClick={() => router.push("/auctions")}
                className='px-4 py-2 text-white bg-gray-500 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400'
            >
                Back to Auctions
            </button>
            <form onSubmit={handleSubmit} className='p-6 mt-6 bg-white rounded-lg shadow-md'>
                <h1 className='mb-6 text-2xl font-bold text-center text-gray-800'>Edit Auction</h1>

                <div className='mb-4'>
                    <label htmlFor='title' className='block text-sm font-medium text-gray-700'>
                        Title
                    </label>
                    <input
                        type='text'
                        name='title'
                        id='title'
                        placeholder='Title'
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                        className='block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                    />
                </div>

                <div className='mb-4'>
                    <label htmlFor='description' className='block text-sm font-medium text-gray-700'>
                        Description
                    </label>
                    <textarea
                        name='description'
                        id='description'
                        placeholder='Description'
                        value={formData.description}
                        onChange={handleInputChange}
                        required
                        className='block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                    ></textarea>
                </div>

                <div className='mb-4'>
                    <label htmlFor='starting_price' className='block text-sm font-medium text-gray-700'>
                        Starting Price
                    </label>
                    <input
                        type='number'
                        name='starting_price'
                        id='starting_price'
                        placeholder='Starting Price'
                        value={formData.starting_price}
                        onChange={handleInputChange}
                        required
                        className='block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                    />
                </div>

                <div className='mb-4'>
                    <label htmlFor='current_price' className='block text-sm font-medium text-gray-700'>
                        Current Price
                    </label>
                    <input
                        type='number'
                        name='current_price'
                        id='current_price'
                        placeholder='Current Price'
                        value={formData.current_price}
                        onChange={handleInputChange}
                        required
                        className='block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                    />
                </div>

                <div className='mb-4'>
                    <label htmlFor='images' className='block text-sm font-medium text-gray-700'>
                        Images
                    </label>
                    <input
                        type='file'
                        name='images'
                        id='images'
                        accept='image/*'
                        multiple
                        onChange={handleImageChange}
                        className='block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                    />
                    <div className='flex flex-wrap mt-4 gap-2'>
                        {imagePreviews.map((src, index) => (
                            <div key={index} className='relative'>
                                <Image src={src} alt={`Preview ${index}`} className='object-cover w-24 h-24 shadow-md rounded-md' width={100} height={100} />
                                <button
                                    type='button'
                                    onClick={() => handleImageDelete(index)}
                                    className='absolute top-0 right-0 flex items-center justify-center w-6 h-6 text-white bg-red-500 rounded-full shadow-md'
                                >
                                    &times;
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className='flex justify-center'>
                    <button
                        type='submit'
                        className='px-6 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400'
                        disabled={loading}
                    >
                        {loading ? "Saving..." : "Update Auction"}
                    </button>
                </div>
            </form>
        </div>
    );
}
