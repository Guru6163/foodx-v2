import React, { useEffect, useState } from 'react';
import { getAllOrders } from '../api/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
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

  const handleAddOrder = () => {
    navigate('add');
  };

  const handleViewInvoice = (rowData) => {
    // rowData contains the details of the selected row
    // You can navigate to the invoice page passing the required data, e.g., orderId, etc.
    // Example: navigate(`/invoice/${rowData.orderId}`);
    console.log('View Invoice for Order:', rowData._id);
    navigate(`invoice/${rowData._id}`);
  };

  const viewInvoiceButtonTemplate = (rowData) => {
    return (
      <button
        className="p-1 px-4 bg-blue-600 text-white rounded-sm hover:bg-blue-700"
        onClick={() => handleViewInvoice(rowData)}
      >
        Invoice
      </button>
    );
  };

  const deliveryPartnerTemplate = (rowData) => {
    return rowData.deliveryPartner?.name || 'Not Assigned';
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-full">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div>
      <button
        className="p-2 px-6 mb-2 border-2 bg-white font-bold text-black cursor-pointer rounded-sm hover:bg-blue-600 hover:text-white"
        style={{ width: 'max-content' }}
        onClick={handleAddOrder}
      >
        Add Order
      </button>
      <DataTable rowHover showGridlines size="small" value={orders}>
        <Column field="user.name" header="Customer" />
        <Column field="restaurant.name" header="Restaurant" />
        <Column field="deliveryPartner?.name" header="Delivery Partner" body={deliveryPartnerTemplate} />
        <Column field="paymentMethod" header="Payment Method" />
        <Column field="totalAmount" header="Total Amount" />
        <Column field="deliveryCharge" header="Delivery Charge" />
        <Column field="orderStatus" header="Order Status" />
        <Column body={viewInvoiceButtonTemplate} header="Actions" />
      </DataTable>
    </div>
  );
}

export default Orders;
