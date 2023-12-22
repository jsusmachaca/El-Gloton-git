import React from "react";
import { useNavigate } from 'react-router-dom';

export const Logged = () => {
  const navigate = useNavigate();

  const isLogged = !!localStorage.getItem('accessToken');
  const icon = isLogged ? (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="white"
      height="20"
      width="20"
      viewBox="0 0  640 512"
    >
      <rect width="100%" height="100%" fill="transparent" />
      <path d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM471 143c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/>
    </svg>
  ) : (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="white"
      height="20"
      width="20"
      viewBox="0 0 448 512"
    >
      <rect width="100%" height="100%" fill="transparent" />
      <path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z"/>
    </svg>
  );

  const buttonText = isLogged ? 'Logout' : 'Login';

  const logg = () => {
    if (isLogged) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      navigate('/auth/login');
    } else {
      navigate('/auth/login');
    }
  };

  return (
    <div className="flex md:order-2">
      <button 
        onClick={logg}
        type="button" 
        className="text-white bg-black hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-black dark:hover:bg-gray-700 dark:focus:ring-blue-800"
      >
        {icon}
      </button>
      <button 
        data-collapse-toggle="navbar-sticky" 
        type="button" 
        className="inline-flex items-center p-5 w-15 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" 
        aria-controls="navbar-sticky" 
        aria-expanded="false"
      >
        <span className="sr-only">Open main menu</span>
        <svg 
          className="w-5 h-5" 
          aria-hidden="true" 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 17 14"
        >
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
      </button>
    </div>
  );    
}
