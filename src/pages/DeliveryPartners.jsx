import React, { useEffect, useState } from 'react';
import { getAllDeliveryPartners } from '../api/api';
import GenericTable from '../components/Table/GenericTable';
import { useNavigate } from 'react-router-dom';

function DeliveryPartners() {
  const navigate = useNavigate();
  const [deliveryPartners, setDeliveryPartners] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getAllDeliveryPartners()
      .then((res) => {
        console.log(res);
        setDeliveryPartners(res?.data);
      })
      .catch(() => setDeliveryPartners([]))
      .finally(() => setIsLoading(false));
  }, []);

  const columns = [
    { key: 'name', header: 'Name' },
    { key: 'email', header: 'Email' },
    { key: 'phoneNumber', header: 'Phone Number' },
    { key: 'address', header: 'Address' },
    { key: 'available', header: 'Availability', className: 'capitalize' },
  ];

  if (isLoading) {
    return (
      <div className="bg-gray-100 flex items-center justify-center">
        <div className="w-full bg-white shadow-lg rounded-sm px-8 py-6">
          <h2 className="text-lg font-bold mb-4">Loading...</h2>
        </div>
      </div>
    );
  }

  return (
    <div>
      <button
        className="p-2 px-6 mb-2 border-2 bg-white font-bold text-black cursor-pointer rounded-sm hover:bg-blue-600 hover:text-white"
        style={{ width: 'max-content' }}
        onClick={() => navigate('add')}
      >
        Setup New Delivery Partner
      </button>
      <GenericTable data={deliveryPartners} columns={columns} title="All Delivery Partners" />
    </div>
  );
}

export default DeliveryPartners;
