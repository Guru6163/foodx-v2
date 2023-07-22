import React, { useEffect, useState } from 'react';
import { getAllDeliveryPartners } from '../api/api';
import GenericTable from '../components/Table/GenericTable';
import { useNavigate } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';


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
        onClick={() => navigate('add')}
      >
        Setup New Delivery Partner
      </button>
      <DataTable rowHover onRowClick={(e)=>navigate(e.data._id)} size='small' value={deliveryPartners} showGridlines tableStyle={{ minWidth: '50rem' }}>
        <Column field="name" header="Code"></Column>
        <Column field="email" header="Name"></Column>
        <Column field="phoneNumber" header="Category"></Column>
        <Column field="available" header="Quantity"></Column>
      </DataTable>
    </div>
  );
}

export default DeliveryPartners;
