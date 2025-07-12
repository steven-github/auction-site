import { useEffect, useState } from "react";

import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/router";

export default function CreateAuction() {
  const router = useRouter();
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
  const [loading, setLoading] = useState(false); // Add loading state

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userEmail = localStorage.getItem("userEmail");
      if (userEmail) {
        setFormData((prev) => ({ ...prev, created_by: userEmail }));
      }
    }
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
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
    setLoading(true); // Show spinner when request starts

    const now = new Date();
    const start_time = now.toISOString();
    const end_time = new Date(
      now.getTime() + 24 * 60 * 60 * 1000,
    ).toISOString();

    try {
      const response = await axios.post("/api/auctions", {
        ...formData,
        start_time,
        end_time,
      });
      console.log("Auction created:", response.data);
      router.push("/auctions");
    } catch (error) {
      console.error("Error creating auction:", error);
    } finally {
      setLoading(false); // Hide spinner when request completes
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <button
        type="button"
        onClick={() => router.push("/auctions")}
        className="rounded-md bg-gray-500 px-4 py-2 text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
      >
        Back to Auctions
      </button>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg rounded-lg bg-white p-6 shadow-md"
      >
        <h1 className="mb-6 text-center text-2xl font-bold text-gray-800">
          Create Auction
        </h1>

        {loading ? (
          <div className="flex items-center justify-center">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
          </div>
        ) : (
          <>
            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                placeholder="Title"
                value={formData.title}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                name="description"
                id="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              ></textarea>
            </div>

            <div className="mb-4">
              <label
                htmlFor="starting_price"
                className="block text-sm font-medium text-gray-700"
              >
                Starting Price
              </label>
              <input
                type="number"
                name="starting_price"
                id="starting_price"
                placeholder="Starting Price"
                value={formData.starting_price}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="current_price"
                className="block text-sm font-medium text-gray-700"
              >
                Current Price
              </label>
              <input
                type="number"
                name="current_price"
                id="current_price"
                placeholder="Current Price"
                value={formData.current_price}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="images"
                className="block text-sm font-medium text-gray-700"
              >
                Images
              </label>
              <input
                type="file"
                name="images"
                id="images"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
              <div className="mt-4 flex flex-wrap gap-2">
                {imagePreviews.map((src, index) => (
                  <div key={index} className="relative">
                    <Image
                      src={src}
                      alt={`Preview ${index}`}
                      className="h-24 w-24 rounded-md object-cover shadow-md"
                      width={100}
                      height={100}
                    />
                    <button
                      type="button"
                      onClick={() => handleImageDelete(index)}
                      className="absolute right-0 top-0 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white shadow-md"
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                Create Auction
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
