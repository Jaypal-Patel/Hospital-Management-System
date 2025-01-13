import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

function Navbar() {
  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(false);
  const [token, setToken] = useState(true);

  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400">
      <div className="text-primary text-xl md:text-2xl font-bold cursor-pointer">
        MyHospital
      </div>
      <nav className="hidden md:flex space-x-6 font-medium">
        <NavLink to="/" className="text-gray-600">
          Home
        </NavLink>
        <NavLink to="doctors" className="text-gray-600 ">
          All Doctors
        </NavLink>
        <NavLink to="about" className="text-gray-600 ">
          About
        </NavLink>
        <NavLink to="contact" className="text-gray-600 ">
          Contact
        </NavLink>
      </nav>
      <div className="flex items-center gap-4">
        {token ? (
          <div className="flex items-center gap-2 cursor-pointer group relative">
            <img
              className="w-8 rounded-full "
              src={assets.profile_pic}
              alt=""
            />
            <img className="w-2.5" src={assets.dropdown_icon} alt="" />
            <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
              <div className="min-w-48 bg-stone-100 rounded p-4 space-y-2">
                <p
                  onClick={() => navigate("/my-profile")}
                  className="hover:text-black cursor-pointer"
                >
                  My Profile
                </p>
                <p
                  onClick={() => navigate("/my-appointments")}
                  className="hover:text-black cursor-pointer"
                >
                  My Appointment
                </p>
                <p
                  onClick={() => setToken(false)}
                  className="hover:text-black cursor-pointer"
                >
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-blue-600 text-white px-8 py-3 rounded-full "
          >
            Create account
          </button>
        )}
        <img
          onClick={() => setShowMenu(true)}
          className="w-6 md:hidden"
          src={assets.menu_icon}
          alt="menu icon"
        />
        {/* ------------- Mobile Menu ------------ */}
        <div
          className={`${
            showMenu ? "fixed w-full" : "h-0 w-0"
          } md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}
        >
          <div className="flex items-center justify-between px-5 py-6">
            <div className="text-primary text-xl font-bold cursor-pointer">
              MyHospital
            </div>
            <img
              className="w-7"
              onClick={() => setShowMenu(false)}
              src={assets.cross_icon}
              alt=""
            />
          </div>
          <div>
            <ul className="flex flex-col items-center gap-2 mt-5 text-lg font-medium">
              <NavLink
                className="px-2 py-0.5 inline-block"
                to="/"
                onClick={() => setShowMenu(false)}
              >
                Home
              </NavLink>
              <NavLink
                className="px-4 py-0.5 inline-block"
                onClick={() => setShowMenu(false)}
                to="/doctors"
              >
                All Doctors
              </NavLink>
              <NavLink
                className="px-4 py-0.5 inline-block"
                onClick={() => setShowMenu(false)}
                to="/about"
              >
                About
              </NavLink>
              <NavLink
                className="px-4 py-0.5 inline-block"
                onClick={() => setShowMenu(false)}
                to="contact"
              >
                Contact
              </NavLink>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Navbar;
