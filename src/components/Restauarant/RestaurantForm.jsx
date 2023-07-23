import React, { useState, useEffect } from 'react';
import { createRestaurant, getRestaurantById, deleteRestaurant, updateRestaurant, createMenuItems } from '../../api/api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from 'react-router-dom';
import Map from '../Maps/Map';
import MenuModal from './AddMenuItem'; // Import the MenuModal component
import MenuItemsTable from './MenuItemsTable';


function CreateRestaurantForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [deleting, setDeleting] = useState(false);
    const [creating, setCreating] = useState(false);
    const [updating, setUpdating] = useState(false);
    const [menuModalVisible, setMenuModalVisible] = useState(false);
    const [onChange, setOnChange] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        phoneNumber: '',
        category: '',
        minDeliveryTime: '',
        maxDeliveryTime: '',
        imageUrl: '',
        lat: 0,
        lng: 0,
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleMarkerPositionChange = (newPosition) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            lat: newPosition.lat,
            lng: newPosition.lng
        }));
    };

    const handleAddMenuItem = (menuItemData) => {
        // You can add the logic to save the menu item data to the backend here
        console.log('Menu item data:', menuItemData);
        const data = { ...menuItemData, restaurantId: id }
        createMenuItems(data).then(res => {
            toast.success('MenuItem added successfully!');
            setMenuModalVisible(false)
            setOnChange(!onChange)
        }).catch((error) => {
            console.error('Error creating Menu:', error);
            toast.error('Error creating Menu. Please try again.');
        })
            .finally(() => {
                setMenuModalVisible(false)
            });
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
                    console.log(restaurant)
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

    if (loading || updating || deleting || creating) {
        return (
            <div className="flex justify-center items-center min-h-full">
                <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500"></div>
            </div>
        );
    }


    return (
        <div className=" bg-gray-100 flex flex-col items-center justify-center ">
            <ToastContainer />
            <div className=" w-full bg-white shadow-lg rounded-sm px-8 py-6 grid grid-cols-5 gap-3">
                <div className='col-span-3'>
                    <h2 className="text-lg font-bold mb-4 ">Create a Restaurant</h2>
                    <form onSubmit={id ? handleUpdate : handleCreate} className="grid grid-cols-2 gap-3">
                        <div>
                            <label htmlFor="name" className="block font-semibold mb-1 text-gray-800">
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
                            <label htmlFor="address" className="block font-semibold mb-1 text-gray-800">
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
                            <label htmlFor="phoneNumber" className="block font-semibold mb-1 text-gray-800">
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
                            <label htmlFor="category" className="block font-semibold mb-1 text-gray-800">
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
                            <label htmlFor="minDeliveryTime" className="block font-semibold mb-1 text-gray-800">
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
                            <label htmlFor="maxDeliveryTime" className="block font-semibold mb-1 text-gray-800">
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
                            <label htmlFor="imageUrl" className="block font-semibold mb-1 text-gray-800">
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
                            <label htmlFor="lat" className="block font-semibold mb-1 text-gray-800">
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
                            <label htmlFor="lng" className="block font-semibold mb-1 text-gray-800">
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
                        {menuModalVisible && (
                            <MenuModal
                                visible={menuModalVisible}
                                onHide={() => setMenuModalVisible(false)}
                                onSubmit={handleAddMenuItem}
                            />
                        )}
                    </form>
                    <div>
                        {id ? (
                            <div className='space-x-2'>
                                <button
                                    onClick={handleUpdate}
                                    className="bg-blue-500 text-white py-1 px-6 rounded-sm hover:bg-blue-600 mt-3 "
                                >
                                    Update
                                </button>
                                <button
                                    onClick={handleDelete}
                                    className="bg-red-500 text-white py-1 px-6 rounded-sm hover:bg-red-600 mt-3"
                                >
                                    {deleting ? 'Deleting...' : 'Delete'}
                                </button>
                                <button
                                    onClick={() => setMenuModalVisible(true)}
                                    className="bg-emerald-500 text-white py-1 px-6 rounded-sm hover:bg-emerald-600 mt-3"
                                >
                                    Add Menu
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
                <div className='mt-3 border-2 shadow-lg col-span-2'>
                    <Map onMarkerPositionChange={handleMarkerPositionChange} initialPosition={{ lat: parseFloat(formData.lat), lng: parseFloat(formData.lng) }} />
                </div>
                <div className="col-span-5">
                    {id && <MenuItemsTable setChange={setCreating} change={onChange} id={id} />}
                </div>


            </div>
        </div>
    );
}

export default CreateRestaurantForm;
