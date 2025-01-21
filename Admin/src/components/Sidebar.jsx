import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AdminContext } from "../context/AdminContext";
import { assets } from "../assets/assets";

function Sidebar() {
  const { aToken } = useContext(AdminContext);

  // Menu items array for dynamic rendering
  const menuItems = [
    {
      to: "/admin-dashboard",
      icon: assets.home_icon,
      label: "Dashboard",
    },
    {
      to: "/all-appointments",
      icon: assets.appointment_icon,
      label: "All Appointments",
    },
    {
      to: "/add-doctor",
      icon: assets.add_icon,
      label: "Add Doctor",
    },
    {
      to: "/doctor-list",
      icon: assets.people_icon,
      label: "Doctors List",
    },
  ];

  return (
    aToken && (
      <div className="w-64 bg-white h-screen shadow-md p-4">
        <ul className="flex flex-col gap-4 text-[#515151]">
          {menuItems.map((item, index) => (
            <li key={index} className="flex items-center gap-3">
              <NavLink
                to={item.to}
                className="flex items-center gap-3 w-full px-3 py-2 rounded"
              >
                <img
                  src={item.icon}
                  alt={`${item.label} Icon`}
                  className="w-6"
                />
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    )
  );
}

export default Sidebar;
