import { useEffect, useState } from "react";

import axios from "axios";
import { useRouter } from "next/router";

export default function EditAuction() {
  const router = useRouter();
  const { id } = router.query;
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: 0,
  });

  useEffect(() => {
    if (id) {
      axios
        .get(`/api/auctions/${id}`)
        .then((response) => setFormData(response.data))
        .catch((error) => console.error("Error fetching auction:", error));
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/auctions/${id}`, formData);
      router.push("/auctions");
    } catch (error) {
      console.error("Error updating auction:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Edit Auction</h1>
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleInputChange}
        required
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={handleInputChange}
        required
      />
      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleInputChange}
        required
      />
      <button type="submit">Update</button>
    </form>
  );
}
