import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getOrderById } from '../../api/api';

const OrderInvoice = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState({});

  useEffect(() => {
    setLoading(true); // Show the loading spinner
    if (id) {
      getOrderById(id)
        .then((res) => {
          setOrder(res.data);
          setLoading(false); // Hide the loading spinner when data is fetched
        })
        .catch((error) => {
          setLoading(false); // Hide the loading spinner on error as well
          console.error('Error fetching order data:', error);
        });
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-full">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500"></div>
      </div>
    );
  }
console.log(order)
  return (
    <div className="p-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">FoodStack</h1>
              <p className="text-sm text-gray-600">Order Invoice</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Order Date: {new Date(order?.order?.orderDate).toLocaleString()}</p>
              <p className="text-sm text-gray-600">Order ID: {order.order?._id}</p>
            </div>
          </div>

          <div className="border-t  border-gray-300 mb-6 grid grid-cols-2">
            <div className="">
              <div className="text-lg font-bold">User Details:</div>
              <div>
                <p className="text-sm font-medium text-gray-800">{order?.user?.firstName} {order?.user?.lastName}</p>
                <p className="text-sm text-gray-600">{order?.user?.email}</p>
                <p className="text-sm text-gray-600">{order?.user?.phoneNumber}</p>
              </div>
            </div>
            <div className="">
              <h2 className="text-lg font-bold">Restaurant Details:</h2>
              <div>
                <p className="text-sm font-medium text-gray-800">{order?.restaurant?.name}</p>
                <p className="text-sm text-gray-600">{order?.restaurant?.address}</p>
              </div>
            </div>
          </div>

          <div>
            <table className="w-full mb-4">
              <thead>
                <tr className="border-b border-gray-300">
                  <th className="py-2 text-left text-sm font-semibold text-gray-800">Item</th>
                  <th className="py-2 text-left text-sm font-semibold text-gray-800">Quantity</th>
                </tr>
              </thead>
              <tbody>
                {order?.order?.items?.map((item) => (
                  <tr key={item?._id} className="border-b border-gray-300">
                    <td className="py-2 text-sm text-gray-800">{item?.itemName}</td>
                    <td className="py-2 text-sm text-gray-800">{item?.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end items-center">
            <div className="w-1/2 text-right">
              <p className="text-sm font-medium text-gray-800">Total Amount: ₹{order.order?.totalAmount?.toFixed(2)}</p>
              <p className="text-sm font-medium text-gray-800">Delivery Charge: ₹{order.order?.deliveryCharge?.toFixed(2)}</p>
            </div>
          </div>

          <div className="flex justify-end items-center">
            <div className="">
              <p className="text-sm font-medium text-gray-800">Final Amount</p>
              <p className="text-2xl font-bold text-gray-800">₹{order.order?.finalAmount?.toFixed(2)}</p>
            </div>
          </div>

          <div className="-mt-6 ">
            <p className="text-lg font-semibold">Order Status: {order.order?.orderStatus}</p>
          </div>
        </div>
      </div>
    </div>
  );

};

export default OrderInvoice;
