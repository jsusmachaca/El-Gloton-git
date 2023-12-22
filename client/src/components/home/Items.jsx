import React from 'react';
import { Modal } from '../modals/Modal';
import { useNavigate } from 'react-router-dom';
import { apiClient } from '../../api/apiClient';
import { useState } from 'react';
import { SubmitButton } from '../actions/SubmitButton';

export const Items = (props) => {
  const isLogged = !!localStorage.getItem('accessToken')
  const [errors, setErrors] = useState({});

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const quantity = e.target.quantity.value;

    try {
      apiClient.post(`/user/buy/${props.id}/`, {
        quantity
      })
        .then(response => {
          window.location.reload()
        })
        .catch (error => {
          console.error('Error' + error)
          setErrors(error.response.data)
        })

    } catch (error) {
      console.error("Error al comprar:", error);
    }
  };

  return (
    <div className='max-w-sm rounded-2xl overflow-hidden shadow-lg'>
      <img className='hover:scale-110 transition' src={props.image} alt="" />
      <div className='relative bg-white'>
        <div className='flex justify-center'>
          <p className='font-bold text-sm text-gray-700 mt-1'>
            {props.title}
          </p>
        </div>
        <div className='flex justify-center pt-4 pb-2'>
          {isLogged 
            ? <Modal 
                title={`S/. ${props.price}`} 
                style='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm fond-semibold text-gray-700 mr-2 mb-2' >
                    <div className="flex rounded-lg  overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
                        <div className=" rounded-md p-6">
                            <h2 className="my-3 text-center text-2xl font-bold tracking-tight text-gray-900">
                              {props.title}
                            </h2>
                            {errors.detail && (
                                <div className='text-red-500 text-sm mb-2 max-w-xs'>
                                  {errors.detail}
                                </div>
                            )}
                          <form onSubmit={handleSubmit} method="post">
                            <div className="mt-4 flex items-center justify-between">
                                <span className="border-b w-1/5 lg:w-1/4"></span>
                                <span className="border-b w-1/5 lg:w-1/4"></span>
                            </div>
                            <div className=" hidden">
                                
                            </div>
                         
                            <div className="mt-4">
                                <div className="flex justify-between">
                                    <label className="block text-gray-700 text-sm font-medium mb-2">Cantidad</label>
                                </div>
                                <input type="number" name="quantity" className="text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none" defaultValue={1} required />
                            </div>
                            <SubmitButton 
                              text='Agregar'
                            />
                    
                          </form>
                        </div>
                    </div>
              </Modal>
            : <p className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm fond-semibold text-gray-700 mr-2 mb-2'>S/. {props.price}</p>}
        </div>
      </div>
    </div>
  );
}