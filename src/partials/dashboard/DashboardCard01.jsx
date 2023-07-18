import React, { useEffect, useState } from 'react';
import Icon from '../../images/icon-01.svg';
import { getAllUsers } from '../../api/api';

function DashboardCard01() {
  const [totalCustomers, setTotalCustomers] = useState(0);

  useEffect(() => {
    const fetchTotalCustomers = async () => {
      try {
        const response = await getAllUsers();
        const totalCustomers = response.totalUsers;
        setTotalCustomers(totalCustomers);
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
          <img src={Icon} width="32" height="32" alt="Icon 01" />
        </header>
        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2">New Customers</h2>
        <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase mb-1">Since Last Week</div>
        <div className="flex items-start">
          <div className="text-3xl font-bold text-slate-800 dark:text-slate-100 mr-2">
            {totalCustomers}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardCard01;
