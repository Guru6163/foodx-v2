import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { HomeIcon, ShoppingCartIcon, UserIcon, BellIcon, TruckIcon } from "@heroicons/react/24/solid";

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const location = useLocation();
  const { pathname } = location;

  const sidebarData = [
    {
      name: "Dashboard",
      path: "/",
      icon: <HomeIcon className="w-6 h-6" />,
    },
    {
      name: "Orders",
      path: "/orders",
      icon: <ShoppingCartIcon className="w-6 h-6" />,
    },
    {
      name: "Users",
      path: "/users",
      icon: <UserIcon className="w-6 h-6" />,
    },
    {
      name: "Restaurants",
      path: "/restuarants",
      icon: <BellIcon className="w-6 h-6" />,
    },
    {
      name: "Delivery Partners",
      path: "/delivery-partners",
      icon: <TruckIcon className="w-6 h-6" />,
    },
  ];

  return (
    <div>
      <div
        id="sidebar"
        className={`flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:!w-64 shrink-0 bg-slate-800 p-4 transition-all duration-200 ease-in-out`}
      >
        <div className="space-y-8">
          <div>
            <h3 id="title" className="text-xs text-white flex flex-col items-center justify-center font-semibold ">
              <span className="text-xl">
                FoodStack
              </span>
              <span>
                Powered by FoodX
              </span>
            </h3>
            <ul className="mt-10">
              {sidebarData.map((item, index) => (
                <NavLink
                  key={index}
                  to={item.path}
                  className={`flex items-center block text-slate-200 truncate transition duration-150 m-1 rounded-sm p-2 ${pathname === item.path || pathname.includes("dashboard")
                    ? "bg-blue-900 hover:bg-blue-800"
                    : "hover:bg-gray-700"
                    }`}
                >
                  <div className="flex items-center">
                    <span className="flex-shrink-0 text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      {item.icon}
                    </span>
                    <span className="ml-2">{item.name}</span>
                  </div>
                </NavLink>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
