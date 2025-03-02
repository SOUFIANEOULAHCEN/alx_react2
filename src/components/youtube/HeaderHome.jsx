import React, { useState } from "react";
import profil from "../../assets/img/profil.png";
import { FaBars } from "react-icons/fa6";
import { FaSearch, FaMicrophone } from "react-icons/fa";
import { MdNotificationsNone, MdExitToApp } from "react-icons/md"; // Icône pour "Logout"
import { IoLogIn } from "react-icons/io5";
import { IoSettings } from "react-icons/io5";

import logo from "../../assets/img/logo.png";
import profile_image from "../../assets/img/profile_image.png";
import { Link, useNavigate } from "react-router-dom";

export default function HeaderHome({ toggleSidebar }) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();
  const toggleProfilePopup = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleLogout = () => {
    navigate("/");
    console.log("Déconnexion");
  };

  return (
    <div className="w-full bg-primary/70 backdrop-blur-lg text-white flex justify-between items-center px-4 py-2 shadow-md z-20 fixed top-0 left-0 right-0">
      {/* Partie logo */}
      <div className="flex items-center gap-10">
        <FaBars
          className="text-xl cursor-pointer ml-3"
          onClick={toggleSidebar}
        />
        <div className="flex items-center gap-2">
          <img className="w-10 h-auto shadow-lg" src={logo} alt="logo" />
          <p className="text-xl font-semibold text-white">IToube</p>
        </div>
      </div>

      {/* Barre de recherche */}
      <div className="flex items-center border border-lightGray rounded-full px-3 py-1 bg-transparent">
        <input
          type="text"
          placeholder="Search..."
          className="outline-none text-white bg-transparent px-3 w-60"
        />
        <FaSearch className="text-gray-500 cursor-pointer hover:text-gray-400 hover:scale-[1.2] transition-all duration-200" />
        <FaMicrophone className="text-gray-500 ml-3 cursor-pointer hover:scale-[1.2] hover:text-gray-400 transition-all duration-200" />
      </div>

      {/* Icônes à droite */}
      <div className="flex items-center gap-3">
        <div
          className="hover:bg-primary p-2 rounded-full transition cursor-pointer"
          onClick={toggleProfilePopup}
        >
          <img
            src={profil}
            alt="profile"
            className="w-8 h-8 rounded-full bg-lightGray"
          />
        </div>

        {isProfileOpen && (
          <div className="absolute top-14 right-4 bg-primary text-white rounded-lg shadow-lg w-64 p-4">
            {/* <h3 className="text-lg font-semibold">Your Profile</h3> */}
            {/* <div className="mt-2 flex items-center gap-2"> */}
              {/* <img
                src={profil}
                alt="profile"
                className="w-10 h-10 rounded-full border border-lightGray"
              /> */}
              {/* <div>
                <p className="text-sm font-semibold">Soufiane</p>
                <p className="text-xs text-gray-400">Web Developer</p> 
              </div> */}
            {/* </div> */}
            <ul className="mt-4 space-y-2">
              <li className="w-full cursor-pointer hover:bg-lightGray p-2 rounded-md">
                <Link
                  to={"/login"}
                  className="cursor-pointer flex items-center gap-3 hover:bg-lightGray rounded-md"
                >
                  <IoLogIn className="text-xl" /> Login
                </Link>
              </li>
              <li className="cursor-pointer flex items-center gap-3 hover:bg-lightGray p-2 rounded-md">
              <IoSettings className="text-lg" />  Settings
              </li>
              {/* <li
                className="cursor-pointer hover:bg-lightGray p-2 rounded-md flex items-center gap-2"
                onClick={handleLogout}
              >
                <MdExitToApp className="text-sm" /> Logout
              </li> */}
            </ul>
          </div>
        )}

        <div className="hover:bg-primary p-2 rounded-full transition">
          <MdNotificationsNone className="text-2xl cursor-pointer" />
        </div>
      </div>
    </div>
  );
}
