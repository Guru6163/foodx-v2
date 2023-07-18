import React, { useEffect, useState } from 'react';
import { getAllRestaurants } from '../api/api';
import GenericTable from '../components/Table/GenericTable';
import { useNavigate } from 'react-router-dom';

function Restaurants() {
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Added loading state
  const navigate = useNavigate();

  useEffect(() => {
    getAllRestaurants()
      .then((res) => {
        setRestaurants(res?.data?.restaurants);
      })
      .catch(() => setRestaurants([]))
      .finally(() => setIsLoading(false)); // Set loading state to false
  }, []);

  const columns = [
    { key: 'name', header: 'Name' },
    { key: 'address', header: 'Location' },
    { key: 'category', header: 'Category' },
    { key: 'phoneNumber', header: 'Phone Number' },
    { key: 'maxDeliveryTime', header: 'Max Delivery Time' },
    { key: 'minDeliveryTime', header: 'Min Delivery Time' },
    { key: 'ratings', header: 'Rating', className: 'text-emerald-500' },
    { key: 'reviews', header: 'Availability' },
  ];

  const handleAddRestaurant = () => {
    navigate('add');
  };

  return (
    <div>
      <button
        className="p-2 px-6 mb-2 border-2 bg-white font-bold text-black cursor-pointer rounded-sm hover:bg-blue-600 hover:text-white"
        style={{ width: 'max-content' }}
        onClick={handleAddRestaurant}
      >
        Add Restaurants
      </button>
      <GenericTable data={restaurants} columns={columns} title="All Restaurants" isLoading={isLoading} navigateTo="update" />
    </div>
  );
}

export default Restaurants;
         