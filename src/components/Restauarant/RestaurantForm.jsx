import React, { useState } from 'react';
import { createRestaurant } from '../../api/api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function CreateRestaurantForm() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        address: '',
        phoneNumber: '',
        category: '',
        minDeliveryTime: '',
        maxDeliveryTime: '',
        imageUrl: '',
        lat: '',
        lng: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        createRestaurant(formData)
            .then((response) => {
                console.log('Restaurant created:', response.data);
                setFormData({});

                toast.success('Restaurant created successfully!');
                setTimeout(() => {
                    navigate("/restuarants")
                }, 3000);
            })
            .catch((error) => {
                console.error('Error creating restaurant:', error);
                toast.error('Error creating restaurant. Please try again.');
            });
    };

    return (
        <div className=" bg-gray-100 flex items-center justify-center">
            <ToastContainer />
            <div className=" w-full bg-white shadow-lg rounded-sm px-8 py-6">
                <h2 className="text-lg font-bold mb-4 ">Create a Restaurant</h2>
                <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="name" className="block font-semibold mb-2 text-gray-800">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-sm px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="address" className="block font-semibold mb-2 text-gray-800">
                            Address
                        </label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-sm px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="phoneNumber" className="block font-semibold mb-2 text-gray-800">
                            Phone Number
                        </label>
                        <input
                            type="text"
                            id="phoneNumber"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-sm px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="category" className="block font-semibold mb-2 text-gray-800">
                            Category
                        </label>
                        <input
                            type="text"
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-sm px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="minDeliveryTime" className="block font-semibold mb-2 text-gray-800">
                            Min Delivery Time
                        </label>
                        <input
                            type="text"
                            id="minDeliveryTime"
                            name="minDeliveryTime"
                            value={formData.minDeliveryTime}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-sm px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="maxDeliveryTime" className="block font-semibold mb-2 text-gray-800">
                            Max Delivery Time
                        </label>
                        <input
                            type="text"
                            id="maxDeliveryTime"
                            name="maxDeliveryTime"
                            value={formData.maxDeliveryTime}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-sm px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="imageUrl" className="block font-semibold mb-2 text-gray-800">
                            Image URL
                        </label>
                        <input
                            type="text"
                            id="imageUrl"
                            name="imageUrl"
                            value={formData.imageUrl}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-sm px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="lat" className="block font-semibold mb-2 text-gray-800">
                            Latitude
                        </label>
                        <input
                            type="text"
                            id="lat"
                            name="lat"
                            value={formData.lat}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-sm px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="lng" className="block font-semibold mb-2 text-gray-800">
                            Longitude
                        </label>
                        <input
                            type="text"
                            id="lng"
                            name="lng"
                            value={formData.lng}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-sm px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                        />
                    </div>
                </form>
                <div >
                    <button
                        onClick={handleSubmit}
                        type="submit"
                        className="bg-blue-500 text-white py-2 px-4 rounded-sm hover:bg-blue-600 mt-3"
                    >
                        Create Restaurant
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CreateRestaurantForm;
