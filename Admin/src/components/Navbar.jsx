import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { AdminContext } from "../context/AdminContext";

function Navbar() {
  const navigate = useNavigate();

  const { aToken, setAToken } = useContext(AdminContext);

  const logout = () => {
    navigate("/");
    aToken && setAToken("");
    aToken && localStorage.removeItem("aToken");
  };

  return (
    <div className="flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white">
      <div className="flex items-center gap-2 text-xs">
        <div className="text-primary text-xl md:text-2xl font-bold cursor-pointer">
          MyHospital
        </div>
        <p className="border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-500">
          {aToken ? "Admin" : "Doctor"}
        </p>
      </div>
      <button
        onClick={logout}
        className="bg-primary text-white text-sm px-10 py-2 rounded-full"
      >
        Logout
      </button>
    </div>
  );
}

export default Navbar;
