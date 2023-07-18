import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom';
import './css/style.css';
import './charts/ChartjsConfig';
import Dashboard from './pages/Dashboard';
import Orders from './pages/Orders';
import Layout from './layout/Layout';
import Restuarants from './pages/Restuarants';
import Users from './pages/Users';
import DeliveryPartners from './pages/DeliveryPartners';
import SignIn from './pages/SignIn';
import RestaurantForm from './components/Restauarant/RestaurantForm';
import DeliveryPartnerForm from './components/DeliveryPartners/DeliveryPartnerForm';
function App() {

  const location = useLocation();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="orders" element={<Orders />} />
        <Route path="restaurants" element={<Restuarants />} />
        <Route path="restaurants/add" element={<RestaurantForm />} />
        <Route path="restaurants/:id" element={<RestaurantForm />} />
        <Route path="users" element={<Users />} />
        <Route path="delivery-partners" element={<DeliveryPartners />} />
        <Route path="delivery-partners/add" element={<DeliveryPartnerForm />} />
        <Route path="delivery-partners/:id" element={<DeliveryPartnerForm />} />
        <Route path="signin" element={<SignIn />} />
      </Route>
    </Routes>

  );
}

export default App;
