import React from 'react';
import { Link } from 'react-router-dom';
import { Logged } from './Logged';

export const NavBar = (props) => {
  return (
    <>
      <nav className="bg-black fixed w-full z-20 top-0 left-0 dark:border-gray-600 my-custom-nav">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link to='/home/foods' className="flex items-center">
            
            <img src="../logo__.png" className="h-24 mr-3 fill-current -m-2" alt="Logo" />
            <span className="self-center text-5xl font-semibold whitespace-nowrap dark:text-white">El Glotón</span>
          </Link>

          <Logged />

          <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" 
            id="navbar-sticky">
           <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-black md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-black">
              <li>
                <Link 
                  to='/home/foods' 
                  className="flex items-center py-2 px-4 text-white rounded hover:bg-gray-800 bg-black dark:hover:bg-gray-500" 
                  aria-current="page"
                >
                  
                  <svg className="w-6 h-6 mr-2" xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512" fill="white">
                    
                    <path d="M216 64c-13.3 0-24 10.7-24 24s10.7 24 24 24h16v33.3C119.6 157.2 32 252.4 32 368H480c0-115.6-87.6-210.8-200-222.7V112h16c13.3 0 24-10.7 24-24s-10.7-24-24-24H256 216zM24 400c-13.3 0-24 10.7-24 24s10.7 24 24 24H488c13.3 0 24-10.7 24-24s-10.7-24-24-24H24z"/>
                  </svg>
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to='/about' 
                  className="flex items-center py-2 px-4 text-white rounded hover:bg-gray-800 bg-black dark:hover:bg-gray-500" 
                >
                 
                  <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 576 512">
                    
                    <path fill="invert" d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm80 256h64c44.2 0 80 35.8 80 80c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16c0-44.2 35.8-80 80-80zm-32-96a64 64 0 1 1 128 0 64 64 0 1 1 -128 0zm256-32H496c8.8 0 16 7.2 16 16s-7.2 16-16 16H368c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64H496c8.8 0 16 7.2 16 16s-7.2 16-16 16H368c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64H496c8.8 0 16 7.2 16 16s-7.2 16-16 16H368c-8.8 0-16-7.2-16-16s7.2-16 16-16z"/>
                  </svg>
                  About
                </Link>
              </li>
              <li>
                <Link 
                  to='/services' 
                  className="flex items-center py-2 px-4 text-white rounded hover:bg-gray-800 bg-black dark:hover:bg-gray-500" 
                >
                  
                  
                  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                  </svg>
                  Services
                </Link>
              </li>
              <li>
                <Link 
                  to='/user/dashboard' 
                  className="flex items-center py-2 px-4 text-white rounded hover:bg-gray-800 bg-black dark:hover:bg-gray-500" 
                  aria-current="page"
                >
                  
                  <svg className="w-6 h-6 mr-2" xmlns="http://www.w3.org/2000/svg" height="16" width="18" viewBox="0 0 576 512" fill="white">
                    
                    <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/>
                  </svg>
                  
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};
