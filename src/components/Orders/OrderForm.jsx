import React, { useState, useEffect } from "react";
import { Dialog } from 'primereact/dialog';
import {
  createOrder,
  getOrderById,
  deleteOrder,
  updateOrder,
  getAllUsers,
  getAllRestaurants,
  getMenuItemsByRestauarantId,
  getAllDeliveryPartners,
} from "../../api/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import { Dropdown } from "primereact/dropdown";

function CreateOrderForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [creating, setCreating] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [allRestaurants, setALlRestauarants] = useState([]);
  const [AllDeliveryPartners, setAllDeliveryPartners] = useState([]);
  const [allMenuItems, setAllMenuItems] = useState([]);
  const [formData, setFormData] = useState({
    user: "",
    restaurant: "",
    deliveryPartner: "Un-Assigned",
    items: [],
    amount: 0,
    deliveryCharge: 0,
    orderStatus: "Pending",
    paymentMethod: "",
    paymentId: null,
  });
  const [showDialog, setShowDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const handleAddItemsClick = () => {
    setShowDialog(true);
  };

  const handleDialogAdd = () => {
    // Add the selected item and quantity to the list of menu items
    const newItem = {
      itemName: selectedItem.name,
      menuItem: selectedItem._id,
      quantity: quantity,
      // Add any other relevant properties for the item
    };

    setFormData({
      ...formData,
      items: [...formData.items, newItem],
      totalAmount: formData.amount
    });

    // Reset the dialog state
    setSelectedItem(null);
    setQuantity(1);
    setShowDialog(false);
  };

  const handleDialogCancel = () => {
    setSelectedItem(null);
    setQuantity(1);
    setShowDialog(false);
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    const parsedValue = name === "deliveryCharge" ? parseInt(value) : value;
    setFormData({ ...formData, [name]: parsedValue });
  };
  

  const calculateItemPrice = (menuItem, quantity) => {
    const selectedMenuItem = allMenuItems.find((item) => item._id === menuItem);
    if (selectedMenuItem) {
      const perItemPrice = selectedMenuItem.price;
      const totalItemPrice = perItemPrice * quantity;
      return { perItemPrice, totalItemPrice };
    }
    return { perItemPrice: 0, totalItemPrice: 0 };
  };

  const calculateAmount = () => {
    let totalAmount = 0;
    for (const item of formData.items) {
      const itemPrice = calculateItemPrice(item.menuItem, item.quantity).totalItemPrice;
      totalAmount += itemPrice;
    }
    return totalAmount;
  };


  const handleCreate = (e) => {
    e.preventDefault();
    setCreating(true);
    createOrder({...formData,totalAmount:calculateAmount()})
      .then((response) => {
        console.log("Order created:", response.data);
        toast.success("Order created successfully!");
        setTimeout(() => {
          navigate("/orders");
        }, 1000);
        setFormData({items:[]});
      })
      .catch((error) => {
        console.error("Error creating order:", error);
        toast.error("Error creating order. Please try again.");
      })
      .finally(() => {
        setCreating(false);
      });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    setUpdating(true);
    updateOrder(id, {...formData,totalAmount:calculateAmount})
      .then((response) => {
        console.log("Order updated:", response.data);
        toast.success("Order updated successfully!");
        setTimeout(() => {
          navigate("/orders");
        }, 1000);
      })
      .catch((error) => {
        console.error("Error updating order:", error);
        toast.error("Error updating order. Please try again.");
      })
      .finally(() => {
        setUpdating(false);
      });
  };

  const handleDelete = () => {
    setDeleting(true);
    deleteOrder(id)
      .then((response) => {
        console.log("Order deleted:", response.data);
        toast.success("Order deleted successfully!");
        setTimeout(() => {
          navigate("/orders");
        }, 1000);
      })
      .catch((error) => {
        console.error("Error deleting order:", error);
        toast.error("Error deleting order. Please try again.");
      })
      .finally(() => {
        setDeleting(false);
      });
  };

  useEffect(() => {
    if (!id) {
      getAllUsers()
        .then((res) => setAllUsers(res?.data?.users))
        .catch((err) => console.log(err));
      getAllRestaurants()
        .then((res) => setALlRestauarants(res?.data?.restaurants))
        .catch((err) => console.log(err));
      getAllDeliveryPartners()
        .then((res) => setAllDeliveryPartners(res?.data))
        .catch((err) => console.log(err));
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
          console.error("Error fetching order:", error);
          // Handle error accordingly (e.g., show an error message)
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [id]);

  useEffect(() => {
    getMenuItemsByRestauarantId(formData.restaurant).then((res) =>
      setAllMenuItems(res?.data)
    );
  }, [formData.restaurant]);

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
  const handleDeleteItem = (index) => {
    const updatedMenuItems = [...formData.items];
    updatedMenuItems.splice(index, 1);
    setFormData({ ...formData, items: updatedMenuItems });
  };

  console.log(formData)
  return (
    <div className="bg-gray-100 flex items-center justify-center">
      <ToastContainer />
      <Dialog
        visible={showDialog}
        onHide={handleDialogCancel}
        header="Add Items"
        footer={
          <div>
            <button
              className="bg-blue-500 text-white py-2 px-6 rounded-sm hover:bg-blue-600 mr-2"
              onClick={handleDialogAdd}
            >
              Add
            </button>
            <button
              className="bg-red-500 text-white py-2 px-6 rounded-sm hover:bg-red-600"
              onClick={handleDialogCancel}
            >
              Cancel
            </button>
          </div>
        }
        style={{ width: "30rem" }}
      >
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-1 text-gray-800">Selected Item</label>
            <Dropdown
              style={{
                borderRadius: "0",
                margin: "0",
                padding: "0",
                height: "35px",
                lineHeight: "10px",
              }}
              value={selectedItem}
              onChange={(e) => setSelectedItem(e.target.value)}
              options={allMenuItems}
              optionLabel="name"
              placeholder="Select an Item"
              filter
              className="w-full md:w-14rem custom-dropdown"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1 text-gray-800">Quantity</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="border border-gray-300 rounded-sm px-2 py-1 w-full focus:outline-none focus:border-blue-500"
              required
            />
          </div>
        </div>
      </Dialog>

      <div className="w-full bg-white shadow-lg rounded-sm px-8 py-6">
        <h2 className="text-lg font-bold mb-4 ">Create an Order</h2>
        <form
          onSubmit={id ? handleUpdate : handleCreate}
          className="grid grid-cols-2 gap-3"
        >
          <div>
            <label
              htmlFor="user"
              className="block font-semibold mb-1 text-gray-800"
            >
              User
            </label>
            <Dropdown
              style={{
                borderRadius: "0",
                margin: "0",
                padding: "0",
                height: "35px",
                lineHeight: "10px",
              }}
              value={formData.user}
              onChange={handleChange}
              name="user"
              options={allUsers}
              optionValue="_id"
              optionLabel="phoneNumber"
              placeholder="Select a User"
              filter
              className="w-full md:w-14rem custom-dropdown"
            />
          </div>
          <div>
            <label
              htmlFor="restaurant"
              className="block font-semibold mb-1 text-gray-800"
            >
              Restaurant
            </label>
            <Dropdown
              style={{
                borderRadius: "0",
                margin: "0",
                padding: "0",
                height: "35px",
                lineHeight: "10px",
              }}
              value={formData.restaurant}
              onChange={handleChange}
              name="restaurant"
              options={allRestaurants}
              optionValue="_id"
              optionLabel="name"
              placeholder="Select a Restaurant"
              filter
              className="w-full md:w-14rem custom-dropdown"
            />
          </div>
          <div>
            <label
              htmlFor="deliveryPartner"
              className="block font-semibold mb-1 text-gray-800"
            >
              Delivery Partner
            </label>
            <Dropdown
              style={{
                borderRadius: "0",
                margin: "0",
                padding: "0",
                height: "35px",
                lineHeight: "10px",
              }}
              value={formData.deliveryPartner}
              onChange={handleChange}
              name="deliveryPartner"
              options={AllDeliveryPartners}
              optionValue="_id"
              optionLabel="name"
              placeholder="Select a Delivery Partner"
              filter
              className="w-full md:w-14rem custom-dropdown"
            />
          </div>
          <div>
            <label
              htmlFor="paymentMethod"
              className="block font-semibold mb-1 text-gray-800"
            >
              Payment Method
            </label>
            <Dropdown
              style={{
                borderRadius: "0",
                margin: "0",
                padding: "0",
                height: "35px",
                lineHeight: "10px",
              }}
              value={formData.paymentMethod}
              onChange={handleChange}
              name="paymentMethod"
              options={["Online Payment", "Cash On Delivery"]}
              placeholder="Select a Payment Method"
              className="w-full md:w-14rem custom-dropdown"
            />
          </div>
          <div className="col-span-2 my-2">
            <span onClick={handleAddItemsClick} className="bg-blue-600 p-2 text-white px-5 cursor-pointer">Add Items</span>
          </div>
          <div className="border-2 col-span-2">
            <div>
              {formData?.items?.map((item, index) => (
                <div key={index} className="p-2 border-b border-gray-300">
                  <div className="flex items-center justify-evenly">

                    <div className="text-center my-auto p-2 mr-2"> {index + 1}</div>
                    <div className="text-center my-auto p-2 mr-2"> {item.itemName}</div>
                    <div className="text-center my-auto p-2 mr-2">Qty: {item.quantity}</div>
                    <div className="text-center my-auto p-2 mr-2">
                      Per Item Price: {calculateItemPrice(item.menuItem, item.quantity).perItemPrice}
                    </div>
                    <div className="text-center my-auto p-2 mr-2">
                      {item.quantity} *  {calculateItemPrice(item.menuItem, item.quantity).perItemPrice} = {calculateItemPrice(item.menuItem, item.quantity).totalItemPrice}
                    </div>
                    <div
                      className="text-center my-auto bg-red-500 text-white py-2 px-4 cursor-pointer"
                      onClick={() => handleDeleteItem(index)}
                    >
                      Delete
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <label
              htmlFor="amount"
              className="block font-semibold mb-1 text-gray-800"
            >
              Amount
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              disabled
              value={calculateAmount()}
              onChange={handleChange}
              className="border border-gray-300 rounded-sm px-2 py-1 w-full focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="deliveryCharge"
              className="block font-semibold mb-1 text-gray-800"
            >
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
            <label
              htmlFor="orderStatus"
              className="block font-semibold mb-1 text-gray-800"
            >
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
            <label
              htmlFor="paymentId"
              className="block font-semibold mb-1 text-gray-800"
            >
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
                {deleting ? "Deleting..." : "Delete"}
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
