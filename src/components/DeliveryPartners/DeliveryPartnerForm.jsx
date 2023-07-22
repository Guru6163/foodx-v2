import React, { useState, useEffect } from 'react';
import { createDeliveryPartner, getDeliveryPartnerById, deleteDeliveryPartner, updateDeliveryPartner } from '../../api/api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from 'react-router-dom';

function CreateDeliveryPartnerForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [creating, setCreating] = useState(false);
    const [updating, setUpdating] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        phoneNumber: '',
        email: '',
        address: '',
        available: true,
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCreate = (e) => {
        e.preventDefault();
        setCreating(true);
        createDeliveryPartner(formData)
            .then((response) => {
                console.log('Delivery partner created:', response.data);
                setFormData({});
                toast.success('Delivery partner created successfully!');
                setTimeout(() => {
                    navigate('/delivery-partners');
                }, 1000);
            })
            .catch((error) => {
                console.error('Error creating delivery partner:', error);
                toast.error('Error creating delivery partner. Please try again.');
            })
            .finally(() => {
                setCreating(false);
            });
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        setUpdating(true);
        updateDeliveryPartner(id, formData)
            .then((response) => {
                console.log('Delivery partner updated:', response.data);
                toast.success('Delivery partner updated successfully!');
                setTimeout(() => {
                    navigate('/delivery-partners');
                }, 1000);
            })
            .catch((error) => {
                console.error('Error updating delivery partner:', error);
                toast.error('Error updating delivery partner. Please try again.');
            })
            .finally(() => {
                setUpdating(false);
            });
    };

    const handleDelete = () => {
        setDeleting(true);
        deleteDeliveryPartner(id)
            .then((response) => {
                console.log('Delivery partner deleted:', response.data);
                toast.success('Delivery partner deleted successfully!');
                setTimeout(() => {
                    navigate('/delivery-partners');
                }, 1000);
            })
            .catch((error) => {
                console.error('Error deleting delivery partner:', error);
                toast.error('Error deleting delivery partner. Please try again.');
            })
            .finally(() => {
                setDeleting(false);
            });
    };

    useEffect(() => {
        if (id) {
            setLoading(true);

            getDeliveryPartnerById(id)
                .then((response) => {
                    console.log(response)
                    const deliveryPartner = response?.data;
                    if (deliveryPartner) {
                        setFormData(deliveryPartner);
                    }
                })
                .catch((error) => {
                    console.error('Error fetching delivery partner:', error);
                    // Handle error accordingly (e.g., show an error message)
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [id]);

    if (loading || deleting || creating || updating) {
        return (
            <div className="flex justify-center items-center min-h-full">
                <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="bg-gray-100 flex items-center justify-center">
            <ToastContainer />
            <div className="w-full bg-white shadow-lg rounded-sm px-8 py-6">
                <h2 className="text-lg font-bold mb-4">Create a Delivery Partner</h2>
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
                        <label htmlFor="email" className="block font-semibold mb-2 text-gray-800">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
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
                        <label htmlFor="available" className="block font-semibold mb-2 text-gray-800">
                            Available
                        </label>
                        <input
                            type="checkbox"
                            id="available"
                            name="available"
                            checked={formData.available}
                            onChange={(e) => setFormData({ ...formData, available: e.target.checked })}
                            className="border border-gray-300 rounded-sm px-2 py-1  focus:outline-none focus:border-blue-500"
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
                                className="bg-red-600 text-white py-1 px-6 rounded-sm hover:bg-red-700 mt-3"
                            >
                                {deleting ? 'Deleting...' : 'Delete'}
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={handleCreate}
                            className="bg-blue-600 text-white py-1 px-6 rounded-sm hover:bg-blue-700 mt-3"
                        >
                            Create Delivery Partner
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CreateDeliveryPartnerForm;
