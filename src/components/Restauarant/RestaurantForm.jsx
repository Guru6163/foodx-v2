import React, { useState, useEffect } from 'react';
import { createRestaurant, getRestaurantById, deleteRestaurant, updateRestaurant } from '../../api/api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from 'react-router-dom';


function CreateRestaurantForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [deleting, setDeleting] = useState(false);
    const [creating, setCreating] = useState(false);
    const [updating, setUpdating] = useState(false);


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


    const handleCreate = (e) => {
        e.preventDefault();
        setCreating(true);
        createRestaurant(formData)
            .then((response) => {
                console.log('Restaurant created:', response.data);
                setFormData({});
                toast.success('Restaurant created successfully!');
                setTimeout(() => {
                    navigate('/restaurants');
                }, 1000);
            })
            .catch((error) => {
                console.error('Error creating restaurant:', error);
                toast.error('Error creating restaurant. Please try again.');
            })
            .finally(() => {
                setCreating(false);
            });
    };


    const handleUpdate = (e) => {
        e.preventDefault();
        setUpdating(true);
        updateRestaurant(id, formData)
            .then((response) => {
                console.log('Restaurant updated:', response.data);
                toast.success('Restaurant updated successfully!');
                setTimeout(() => {
                    navigate('/restaurants');
                }, 1000);
            })
            .catch((error) => {
                console.error('Error updating restaurant:', error);
                toast.error('Error updating restaurant. Please try again.');
            })
            .finally(() => {
                setUpdating(false);
            });
    };


    const handleDelete = () => {
        setDeleting(true);
        deleteRestaurant(id)
            .then((response) => {
                console.log('Restaurant deleted:', response.data);
                toast.success('Restaurant deleted successfully!');
                setTimeout(() => {
                    navigate('/restaurants');
                }, 1000);
            })
            .catch((error) => {
                console.error('Error deleting restaurant:', error);
                toast.error('Error deleting restaurant. Please try again.');
            })
            .finally(() => {
                setDeleting(false);
            });
    };


    useEffect(() => {
        if (id) {
            setLoading(true);

            getRestaurantById(id)
                .then((response) => {
                    const restaurant = response?.data?.restaurant;
                    if (restaurant) {
                        setFormData(restaurant);
                    }
                })
                .catch((error) => {
                    console.error('Error fetching restaurant:', error);
                    // Handle error accordingly (e.g., show an error message)
                }).finally(() => {
                    setLoading(false);
                });
        }
    }, [id]);

    if (loading) {
        return (
            <div className="bg-gray-100 flex items-center justify-center">
                <div className="w-full bg-white shadow-lg rounded-sm px-8 py-6">
                    <h2 className="text-lg font-bold mb-4">Loading...</h2>
                </div>
            </div>
        );
    }

    if (deleting) {
        return (
            <div className="bg-gray-100 flex items-center justify-center">
                <div className="w-full bg-white shadow-lg rounded-sm px-8 py-6">
                    <h2 className="text-lg font-bold mb-4">Deleting...</h2>
                </div>
            </div>
        );
    }

    if (creating) {
        return (
            <div className="bg-gray-100 flex items-center justify-center">
                <div className="w-full bg-white shadow-lg rounded-sm px-8 py-6">
                    <h2 className="text-lg font-bold mb-4">Creating...</h2>
                </div>
            </div>
        );
    }

    if (updating) {
        return (
            <div className="bg-gray-100 flex items-center justify-center">
                <div className="w-full bg-white shadow-lg rounded-sm px-8 py-6">
                    <h2 className="text-lg font-bold mb-4">Updating...</h2>
                </div>
            </div>
        );
    }



    return (
        <div className=" bg-gray-100 flex items-center justify-center">
            <ToastContainer />
            <div className=" w-full bg-white shadow-lg rounded-sm px-8 py-6">
                <h2 className="text-lg font-bold mb-4 ">Create a Restaurant</h2>
                <form onSubmit={id ? handleUpdate : handleCreate} className="grid grid-cols-2 gap-6">
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
                            className="border border-gray-300 rounded-sm px-2 py-1 w-full focus:outline-none focus:border-blue-500"
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
                            className="border border-gray-300 rounded-sm px-2 py-1 w-full focus:outline-none focus:border-blue-500"
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
                            className="border border-gray-300 rounded-sm px-2 py-1 w-full focus:outline-none focus:border-blue-500"
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
                            className="border border-gray-300 rounded-sm px-2 py-1 w-full focus:outline-none focus:border-blue-500"
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
                            className="border border-gray-300 rounded-sm px-2 py-1 w-full focus:outline-none focus:border-blue-500"
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
                            className="border border-gray-300 rounded-sm px-2 py-1 w-full focus:outline-none focus:border-blue-500"
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
                            className="border border-gray-300 rounded-sm px-2 py-1 w-full focus:outline-none focus:border-blue-500"
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
                            className="border border-gray-300 rounded-sm px-2 py-1 w-full focus:outline-none focus:border-blue-500"
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
                            className="border border-gray-300 rounded-sm px-2 py-1 w-full focus:outline-none focus:border-blue-500"
                        />
                    </div>
                </form>
                <div>
                    {id ? (
                        <div>
                            <button
                                onClick={handleUpdate}
                                className="bg-blue-500 text-white py-1 px-6 rounded-sm hover:bg-blue-600 mt-3 mr-2"
                            >
                                Update
                            </button>
                            <button
                                onClick={handleDelete}
                                className="bg-red-500 text-white py-1 px-6 rounded-sm hover:bg-red-600 mt-3"
                            >
                                {deleting ? 'Deleting...' : 'Delete'}
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={handleCreate}
                            className="bg-blue-500 text-white py-1 px-6 rounded-sm hover:bg-blue-600 mt-3"
                        >
                            Create Restaurant
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CreateRestaurantForm;
