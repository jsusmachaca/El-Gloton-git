import React, { useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiClient } from "../../api/apiClient";
import { SubmitButton } from "../actions/SubmitButton";


export const Login = () => {
    const navigate = useNavigate();

    const [errors, setError] = useState(null);

    const isAuthenticated = !!localStorage.getItem('accessToken');

    
    const handleSubmit = async (e) => {
      e.preventDefault();
      const username = e.target.username.value;
      const password = e.target.password.value;
    
      try {
        apiClient.post("/authentication/login/", {
          username,
          password,
        })
          .then(response => {
            const { access, refresh } = response.data;
            localStorage.setItem("accessToken", access);
            localStorage.setItem("refreshToken", refresh);
            navigate("/user/dashboard");
          })
          .catch(error => {
            console.error(JSON.stringify(error.response.data, null, 2));
            setError("Las crendenciales de inicio de sesión son incorrectas")
          })
        
      } catch (error) {
        console.error("Error al iniciar sesión:", error);
      }
    };

    return (
      <div className='bg-gray-100 flex h-screen items-center justify-center px-4 sm:px-6 lg:px-8'>
          <div className="flex rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
              <div className="bg-white shadow-md rounded-md p-6">
                  <h2 className="my-3 text-center text-3xl font-bold tracking-tight text-gray-900">
                      Sign up for an account
                  </h2>
                <form onSubmit={handleSubmit} method="post">
                  {errors && (
                    <div className="text-red-500 text-sm mb-2">
                      {errors} {/* Mostrar el mensaje de error en rojo */}
                    </div>
                  )}
                  <div className="mt-4 flex items-center justify-between">
                      <span className="border-b w-1/5 lg:w-1/4"></span>
                      <a href="#" className="text-xs text-center text-gray-500 uppercase">Enter your credentials</a>
                      <span className="border-b w-1/5 lg:w-1/4"></span>
                  </div>
                  <div className=" hidden">
                      
                  </div>
                  <div className="mt-4">
                      <label className="block text-gray-700 text-sm font-medium mb-2">Username</label>
                      <input type="text" name="username" className="text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none" required />
                  </div>
                  <div className="mt-4">
                      <div className="flex justify-between">
                          <label className="block text-gray-700 text-sm font-medium mb-2">Password</label>
                      </div>
                      <input type="password" name="password" className="text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none" required />
                  </div>

                  <SubmitButton 
                    text='Login'
                  />

                  <div className="mt-4 flex items-center justify-between">
                      <span className="border-b w-1/5 md:w-1/4"></span>
                      <Link to='/auth/register' className="text-xs text-gray-500 uppercase">or sign up</Link>
                      <span className="border-b w-1/5 md:w-1/4"></span>
                  </div>
                </form>
              </div>
          </div>
      </div>
    )
}