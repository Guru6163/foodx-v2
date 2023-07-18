import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../images/icon-02.svg';
import { getOrdersCount } from '../../api/api';

function DashboardCard02() {

  const [ordersCount, setOrdersCount] = useState(0);

  useEffect(() => {
    const fetchTotalCustomers = async () => {
      try {
        const response = await getOrdersCount();
        console.log(response)
        const totalOrdersCount = response.totalOrders;
        setOrdersCount(totalOrdersCount);
      } catch (error) {
        console.log('Error fetching total customers:', error);
      }
    };

    fetchTotalCustomers();
  }, []);

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <div className="px-5 pt-5">
        <header className="flex justify-between items-start mb-2">
          {/* Icon */}
          <img src={Icon} width="32" height="32" alt="Icon 02" />
          {/* Menu button */}
        
        </header>
        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2">Total Sales</h2>
        <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase mb-1">Since Last Week</div>
        <div className="flex items-start">
          <div className="text-3xl font-bold text-slate-800 dark:text-slate-100 mr-2">{ordersCount}</div>
         
        </div>
      </div>
      
    </div>
  );
}

export default DashboardCard02;
