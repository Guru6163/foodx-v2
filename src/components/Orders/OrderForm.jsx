import React, { useState, useEffect } from 'react';
import { createOrder, getOrderById, deleteOrder, updateOrder, getAllUsers, getAllRestaurants, getMenuItemsByRestauarantId ,getAllDeliveryPartners} from '../../api/api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from 'react-router-dom';
import { Dropdown } from 'primereact/dropdown';

function CreateOrderForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [creating, setCreating] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [allUsers, setAllUsers] = useState([])
  const [allRestaurants, setALlRestauarants] = useState([])
  const [AllDeliveryPartners, setAllDeliveryPartners] = useState([])
  const [allMenuItems, setAllMenuItems] = useState([])
  const [formData, setFormData] = useState({
    user: '',
    restaurant: '',
    deliveryPartner: 'Un-Assigned',
    menuItems: [],
    totalAmount: 0,
    deliveryCharge: 0,
    orderStatus: 'Pending',
    paymentMethod: '',
    paymentId: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleMenuItemChange = (e) => {
    const selectedMenuItemIds = e.value.map((menuItem) => menuItem._id);
    setFormData({ ...formData, menuItems: selectedMenuItemIds });
  };


  const handleCreate = (e) => {
    e.preventDefault();
    setCreating(true);
    createOrder(formData)
      .then((response) => {
        console.log('Order created:', response.data);
        setFormData({});
        toast.success('Order created successfully!');
        setTimeout(() => {
          navigate('/orders');
        }, 1000);
      })
      .catch((error) => {
        console.error('Error creating order:', error);
        toast.error('Error creating order. Please try again.');
      })
      .finally(() => {
        setCreating(false);
      });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    setUpdating(true);
    updateOrder(id, formData)
      .then((response) => {
        console.log('Order updated:', response.data);
        toast.success('Order updated successfully!');
        setTimeout(() => {
          navigate('/orders');
        }, 1000);
      })
      .catch((error) => {
        console.error('Error updating order:', error);
        toast.error('Error updating order. Please try again.');
      })
      .finally(() => {
        setUpdating(false);
      });
  };

  const handleDelete = () => {
    setDeleting(true);
    deleteOrder(id)
      .then((response) => {
        console.log('Order deleted:', response.data);
        toast.success('Order deleted successfully!');
        setTimeout(() => {
          navigate('/orders');
        }, 1000);
      })
      .catch((error) => {
        console.error('Error deleting order:', error);
        toast.error('Error deleting order. Please try again.');
      })
      .finally(() => {
        setDeleting(false);
      });
  };

  useEffect(() => {
    if (!id) {
      getAllUsers().then(res => setAllUsers(res?.data?.users)).catch(err => console.log(err))
      getAllRestaurants().then(res => setALlRestauarants(res?.data?.restaurants)).catch(err => console.log(err))
      getAllDeliveryPartners().then(res => setAllDeliveryPartners(res?.data)).catch(err => console.log(err))
    }
    if (id) {
      setLoading(true);
      getOrderById(id)
        .then((response) => {
          const order = response?.data;
          if (order) {
            setFormData(order);
          }
        })
        .catch((error) => {
          console.error('Error fetching order:', error);
          // Handle error accordingly (e.g., show an error message)
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [id]);

  useEffect(() => {
    getMenuItemsByRestauarantId(formData.restaurant).then(res => setAllMenuItems(res?.data))
  }, [formData.restaurant])

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
    <div className="bg-gray-100 flex items-center justify-center">
      
      <ToastContainer />
      <div className="w-full bg-white shadow-lg rounded-sm px-8 py-6">
        <h2 className="text-lg font-bold mb-4 ">Create an Order</h2>
        <form onSubmit={id ? handleUpdate : handleCreate} className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="user" className="block font-semibold mb-1 text-gray-800">
              User
            </label>
            <Dropdown style={{borderRadius:"0"}} value={formData.user} onChange={handleChange} name="user" options={allUsers} optionValue='_id' optionLabel="phoneNumber" placeholder="Select a User"
              filter className="w-full md:w-14rem custom-dropdown" />
          </div>
          <div>
            <label htmlFor="restaurant" className="block font-semibold mb-1 text-gray-800">
              Restaurant
            </label>
            <Dropdown style={{borderRadius:"0"}} value={formData.restaurant} onChange={handleChange} name="restaurant" options={allRestaurants} optionValue='_id' optionLabel="name" placeholder="Select a Restaurant"
              filter className="w-full md:w-14rem custom-dropdown" />
          </div>
          <div>
            <label htmlFor="deliveryPartner" className="block font-semibold mb-1 text-gray-800">
              Delivery Partner
            </label>
            <Dropdown style={{borderRadius:"0"}} value={formData.deliveryPartner} onChange={handleChange} name="deliveryPartner" options={AllDeliveryPartners} optionValue='_id' optionLabel="name" placeholder="Select a Delivery Partner"
              filter className="w-full md:w-14rem custom-dropdown" />
          </div>
          <div>
            <label htmlFor="items" className="block font-semibold mb-1 text-gray-800">
              Items
            </label>
            <Dropdown
            style={{ borderRadius: "0" }}
            value={formData.menuItems}
            onChange={handleMenuItemChange}
            name="menuItems"
            options={allMenuItems}
            optionValue='_id'
            optionLabel="name"
            placeholder="Select Menu Items"
            filter
            className="w-full md:w-14rem custom-dropdown"
            multiple // Allow multiple selection
          />
          </div>
          <div>
            <label htmlFor="totalAmount" className="block font-semibold mb-1 text-gray-800">
              Total Amount
            </label>
            <input
              type="number"
              id="totalAmount"
              name="totalAmount"
              value={formData.totalAmount}
              onChange={handleChange}
              className="border border-gray-300 rounded-sm px-2 py-1 w-full focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="deliveryCharge" className="block font-semibold mb-1 text-gray-800">
              Delivery Charge
            </label>
            <input
              type="number"
              id="deliveryCharge"
              name="deliveryCharge"
              value={formData.deliveryCharge}
              onChange={handleChange}
              className="border border-gray-300 rounded-sm px-2 py-1 w-full focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="orderStatus" className="block font-semibold mb-1 text-gray-800">
              Order Status
            </label>
            <select
              id="orderStatus"
              name="orderStatus"
              value={formData.orderStatus}
              onChange={handleChange}
              className="border border-gray-300 rounded-sm px-2 py-1 w-full focus:outline-none focus:border-blue-500"
              required
            >
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
          <div>
            <label htmlFor="paymentMethod" className="block font-semibold mb-1 text-gray-800">
              Payment Method
            </label>
            <input
              type="text"
              id="paymentMethod"
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              className="border border-gray-300 rounded-sm px-2 py-1 w-full focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="paymentId" className="block font-semibold mb-1 text-gray-800">
              Payment ID
            </label>
            <input
              type="text"
              id="paymentId"
              name="paymentId"
              value={formData.paymentId}
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
              Create Order
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default CreateOrderForm;
