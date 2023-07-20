import React, { useState } from "react";
import axios from "axios";

const AddMenuItem = () => {
  const [menuItem, setMenuItem] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    restaurantId: "", // You can set the restaurant ID dynamically based on your app's context
    available: true,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMenuItem({ ...menuItem, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/menuItems", menuItem); // Assuming the backend API endpoint is "/api/menuItems" for creating menu items
      console.log("Menu item added:", response.data);
      // Reset the form after successful submission
      setMenuItem({
        name: "",
        description: "",
        price: "",
        category: "",
        restaurantId: "",
        available: true,
      });
    } catch (error) {
      console.error("Failed to add menu item:", error.message);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Add Menu Item</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={menuItem.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700 font-bold mb-2"
          >
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            value={menuItem.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block text-gray-700 font-bold mb-2">
            Price:
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={menuItem.price}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="category" className="block text-gray-700 font-bold mb-2">
            Category:
          </label>
          <input
            type="text"
            id="category"
            name="category"
            value={menuItem.category}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>
        {/* You can dynamically set the restaurantId in your app based on the current restaurant context */}
        {/* <input type="hidden" name="restaurantId" value="your_restaurant_id_here" /> */}
        <div className="mb-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Menu Item
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddMenuItem;
