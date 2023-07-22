import React, { useEffect, useState } from 'react';
import { getAllRestaurants } from '../api/api';
import GenericTable from '../components/Table/GenericTable';
import { useNavigate } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';


function Restaurants() {
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Added loading state
  const navigate = useNavigate();

  useEffect(() => {
    getAllRestaurants()
      .then((res) => {
        console.log(res.data.restaurants)
        setRestaurants(res?.data?.restaurants);
      })
      .catch(() => setRestaurants([]))
      .finally(() => setIsLoading(false)); // Set loading state to false
  }, []);


  const handleAddRestaurant = () => {
    navigate('add');
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
        onClick={handleAddRestaurant}
      >
        Add Restaurants
      </button>
      <DataTable size='small' value={restaurants} showGridlines tableStyle={{ minWidth: '50rem' }}>
        <Column field="name" header="Name"></Column>
        <Column field="address" header="Location"></Column>
        <Column field="category" header="Category"></Column>
        <Column field="phoneNumber" header="phoneNumber"></Column>
        <Column field="maxDeliveryTime" header="Max Delivery Time"></Column>
        <Column field="minDeliveryTime" header="Min Delivery Time"></Column>
        <Column field="rating" header="Rating"></Column>
        <Column field="available" header="available"></Column>
      </DataTable>
    </div>
  );
}

export default Restaurants;
