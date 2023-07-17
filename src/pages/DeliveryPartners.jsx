import React, { useEffect, useState } from 'react';
import { getAllDeliveryPartners } from '../api/api';
import GenericTable from '../components/Table/GenericTable';

function DeliveryPartners() {
  const [deliveryPartners, setDeliveryPartners] = useState([]);

  useEffect(() => {
    getAllDeliveryPartners()
      .then((res) => {
        console.log(res);
        setDeliveryPartners(res?.data);
      })
      .catch(() => setDeliveryPartners([]));
  }, []);

  const columns = [
    { key: 'name', header: 'Name' },
    { key: 'email', header: 'Email' },
    { key: 'phoneNumber', header: 'Phone Number' },
    { key: 'vehicleType', header: 'Vehicle Type' },
    { key: 'maxDistance', header: 'Max Distance' },
    { key: 'availability', header: 'Availability' },
    { key: 'ratings', header: 'Rating', className: 'text-emerald-500' },
    { key: 'reviews', header: 'Reviews' },
  ];

  return (
    <div>
      <GenericTable data={deliveryPartners} columns={columns} title="All Delivery Partners" />
    </div>
  );
}

export default DeliveryPartners;
