import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";

function MenuModal({ visible, onHide, onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Dialog
      visible={visible}
      onHide={onHide}
      header="Add Menu Item"
      modal
      style={{ width: "30rem" }}
      footer={
        <div>
          <button
            label="Cancel"
            onClick={onHide}
            className="bg-red-500 text-white py-1 px-6 rounded-sm hover:bg-red-600 mt-3"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            type="submit"
            className="bg-emerald-500 text-white py-1 px-6 rounded-sm hover:bg-emerald-600 mt-3"
          >
            Add Menu
          </button>
        </div>
      }
    >
      <form onSubmit={handleSubmit}>
        <div className="p-fluid  space-y-2">
          <div className="p-field">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border border-gray-300 rounded-sm px-2 py-1 w-full focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="p-field">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="border border-gray-300 rounded-sm px-2 py-1 w-full focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="p-field">
            <label htmlFor="price">Price</label>
            <input
              type="text"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="border border-gray-300 rounded-sm px-2 py-1 w-full focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="p-field">
            <label htmlFor="category">Category</label>
            <input
              type="text"
              id="category"
              name="category"
              required
              value={formData.category}
              onChange={handleChange}
              className="border border-gray-300 rounded-sm px-2 py-1 w-full focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
      </form>
    </Dialog>
  );
}

export default MenuModal;
