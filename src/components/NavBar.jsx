import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaRegMoon, FaMoon } from "react-icons/fa";
import logo from '../assets/images/logo_igp_normal.png';

export const NavBar = ({ user, toggleTheme, theme }) => {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await axios.get('http://localhost:5000/auth/logout', { withCredentials: true });
      setUser(null);
      navigate('/'); 
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <header className="flex flex-col sm:flex-row justify-between items-center mb-5 p-4">
      {/* Logo */}
      <img src={logo} alt="Logo IGP" style={{ width: '200px', height: 'auto' }} />
      
      {/* Navigation Menu */}
      <nav className="flex justify-between items-center w-full sm:w-auto">
        <ul className="flex text-[18px] space-x-4 sm:space-x-8">
          <li>
            <a href="#">Inicio</a>
          </li>
          <li>
            <a href="#">Actividad Sísmica</a>
          </li>
          <li>
            <a href="#">Actividad Volcánica</a>
          </li>
          <li>
            <a href="#">Huaycos</a>
          </li>
          {user && (
            <li>
              <button
                onClick={logout}
                className="text-white-500 hover:text-red-700 transition-colors duration-200 p-1 bg-red-500 rounded"
              >
                Cerrar sesión
              </button>
            </li>
          )}
        </ul>

        {/* Theme Toggle Button */}
        <div className="flex items-center ml-4">
          <button
            onClick={toggleTheme}
            className="p-2 bg-gray-500 rounded"
          >
            {theme === 'light' ? <FaRegMoon size={20} /> : <FaMoon size={20} />}
          </button>
        </div>
      </nav>
    </header>
  );
};
