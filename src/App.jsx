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
        <Route path="restuarants" element={<Restuarants />} />
        <Route path="users" element={<Users />} />
        <Route path="delivery-partners" element={<DeliveryPartners />} />
      </Route>
    </Routes>

  );
}

export default App;
