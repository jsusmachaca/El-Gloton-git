import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiClient } from "../../api/apiClient";
import { SubmitButton } from "../actions/SubmitButton";


export const Registe = () => {
    const navigate = useNavigate();

    const [errors, setErrors] = useState({});
    
    const isAuthenticated = !!localStorage.getItem('accessToken');

    
    const handleSubmit = async (e) => {
      e.preventDefault();
      const first_name = e.target.first_name.value;
      const last_name = e.target.last_name.value;
      const email = e.target.email.value;
      const username = e.target.username.value;

      const password = e.target.password.value;
      const confirm_password = e.target.confirm_password.value;
      

      try {
        apiClient.post('/authentication/register/', {
          first_name,
          last_name,
          email,
          username,
          password,
          confirm_password,
        })
          .then(response => {
            console.log(response.data);
            navigate("/auth/login");
          })
          .catch(error => {
            console.error(JSON.stringify(error.response.data, null, 2));
            setErrors(error.response.data)
          })
          
      } catch (error) {
        console.error("Error al registrarse:", error);
      }
    };

    return (
      <div className="bg-gray-100 flex h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8 ">
              <div className="bg-white shadow-md p-6 rounded-lg">      
                  <h2 className="my-3 text-center text-3xl font-bold tracking-tight text-gray-900">
                      Sign up for an account
                  </h2>
                  <form className="space-y-6" method="POST" onSubmit={handleSubmit}>
                    {errors.username && (
                        <p className="text-red-500 text-center">{errors.username[0]}</p>
                    )}
                    <div className="mt-4 flex items-center justify-between">
                        <span className="border-b w-1/5 lg:w-1/4"></span>
                        <a href="#" className="text-xs text-center text-gray-500 uppercase">Enter your credentials</a>
                        <span className="border-b w-1/5 lg:w-1/4"></span>
                    </div>
                    <div>
                          <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">First Name</label>
                          <div className="mt-1">
                              <input 
                                name="first_name" 
                                type="username" required
                                className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm" />
                          </div>
                      </div>
                      <div>
                          <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">Last Name</label>
                          <div className="mt-1">
                              <input 
                                name="last_name" 
                                type="username" required
                                className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm" />
                          </div>
                      </div>
                      <div>
                          <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">Username</label>
                          <div className="mt-1">
                              <input 
                                name="username" 
                                type="username" 
                                required
                                className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm" />
                          </div>
                      </div>
      
                      <div>
                          {errors.email && (
                            <p className="text-red-500">{errors.email[0]}</p>
                          )}
                          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Email</label>
                          <div className="mt-1">
                              <input 
                                name="email" 
                                type="email-address" 
                                autoComplete="email-address" 
                                required
                                className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm" />
                          </div>
                      </div>
      
                      <div>
                          {errors.password && (
                            <p className="text-red-500">{errors.password[0]}</p>
                          )}
                          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                          <div className="mt-1">
                              <input 
                                name="password" 
                                type="password" 
                                autoComplete="password" 
                                required
                                className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm" />
                          </div>
                      </div>
      
                      <div>
                          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                          <div className="mt-1">
                              <input 
                                name="confirm_password" 
                                type="password" 
                                autoComplete="confirm-password" 
                                required
                                className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm" />
                          </div>
                      </div>
      
                      <div>
                        <SubmitButton text='Register Account'/>
                      </div>
                  </form>
              </div>
        </div>
      </div>
    )
}