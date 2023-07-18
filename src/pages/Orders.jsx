import React, { useEffect, useState } from 'react';
import { getAllOrders } from '../api/api';
import GenericTable from '../components/Table/GenericTable';
import { useNavigate } from 'react-router-dom';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Added loading state
  const navigate = useNavigate();

  useEffect(() => {
    getAllOrders()
      .then((res) => {
        setOrders(res.data);
      })
      .catch(() => setOrders([]))
      .finally(() => setIsLoading(false));
  }, []);

  const columns = [
    { key: '_id', header: 'Order Number' },
    { key: 'totalAmount', header: 'Total Amount' },
    { key: 'orderStatus', header: 'Order Status' },
    { key: 'paymentMethod', header: 'Payment Method' },
    { key: 'deliveryPartner', header: 'Delivery Partner' },
  ];

  const handleAddOrder = () => {
    navigate('add');
  };

  return (
    <div>
      <button
        className="p-2 px-6 mb-2 border-2 bg-white font-bold text-black cursor-pointer rounded-sm hover:bg-blue-600 hover:text-white"
        style={{ width: 'max-content' }}
        onClick={handleAddOrder}
      >
        Add Order
      </button>
      <GenericTable data={orders} columns={columns} title="All Orders" isLoading={isLoading}  />
    </div>
  );
}

export default Orders;
