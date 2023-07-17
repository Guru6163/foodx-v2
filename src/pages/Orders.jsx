import React, { useEffect, useState } from 'react';
import { getAllOrders } from '../api/api';

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getAllOrders()
      .then((res) => {
        setOrders(res.data)
      })
      .catch(() => setOrders([]));
  }, []);

  return (
    <div>
      
      <div className="col-span-full xl:col-span-8 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
        <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
          <h2 className="font-semibold text-slate-800 dark:text-slate-100">All Orders</h2>
        </header>
        <div className="p-3">
          {/* Table */}
          <div className="overflow-x-auto">
            <table className="table-auto w-full dark:text-slate-300">
              {/* Table header */}
              <thead className="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm">
                <tr>
                  <th className="p-2">
                    <div className="font-semibold text-left">Restuarant Name</div>
                  </th>
                  <th className="p-2">
                    <div className="font-semibold text-center">Total Amout</div>
                  </th>
                  <th className="p-2">
                    <div className="font-semibold text-center">Order Status</div>
                  </th>
                  <th className="p-2">
                    <div className="font-semibold text-center">Payment Method</div>
                  </th>
                  <th className="p-2">
                    <div className="font-semibold text-center">Payment ID</div>
                  </th>
                  <th className="p-2">
                    <div className="font-semibold text-center">Created At</div>
                  </th>
                </tr>
              </thead>
              {/* Table body */}
              <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
                {Array.isArray(orders) && orders.length > 0 ? (
                  orders.map((order) => (
                    <tr key={order._id}>
                      <td className="p-2">
                        <div className="flex items-center">
                          <div className="text-slate-800 dark:text-slate-100">{order.restaurant}</div>
                        </div>
                      </td>
                      <td className="p-2">
                        <div className="text-center">₹{order.totalAmount}</div>
                      </td>
                      <td className="p-2">
                        <div className="text-center text-emerald-500">{order.orderStatus}</div>
                      </td>
                      <td className="p-2">
                        <div className="text-center">{order.paymentMethod}</div>
                      </td>
                      <td className="p-2">
                        <div className="text-center">{order.paymentId}</div>
                      </td>
                      <td className="p-2">
                        <div className="text-center">{order.orderDate}</div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="p-2" colSpan="6">
                      No orders found.
                    </td>
                  </tr>
                )}
              </tbody>

            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Orders;
