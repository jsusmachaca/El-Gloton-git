import React from "react";
import { useState, useEffect } from "react";
import { apiClient } from "../../api/apiClient";
import { Modal } from "../modals/Modal";
import { ItemCard } from "./ItemCard";
import { SubmitButton } from "../actions/SubmitButton";
import { usePayedStore } from "../../store/payed";

export const Dashboard = () => {

  const [dashBoard, setDashBoard] = useState([]);
  const [errors, setErrors] = useState({});
  const [errorDel, setErrorDel] = useState({});

  const payed = usePayedStore(state => state.payed)
  const fetchPayed = usePayedStore(state => state.fetchPayed)
  const idOrder = usePayedStore(state => state.idOrder)
  const fetchOrderId = usePayedStore(state => state.fetchOrderId)


  let idCard;

  useEffect(() => {
    apiClient.get('/user/dashboard/')
      .then(response => {
        setDashBoard(response.data)
      })
  }, []);


  const setTotalPrice = () => {
    let total = 0
    dashBoard.map((d, i) => (
      d.order.map((item, index) => {
        const price = parseFloat(item.food.price)
        const quant = parseFloat(item.quantity)

        total += price * quant;

      })
    ))
    return total.toFixed(2)
  }
  const totalPrice = setTotalPrice()


  const handleDelete = (id) => {
    try {
      apiClient.delete(`/user/dashboard/del/${id}/`)
        .then(response => {
          const del = dashBoard.map(item => {
            return {
              ...item,
              order: item.order.filter(item => item.id !== id)
            }
          })
          setDashBoard(del);
        })
        .catch (error => {
          console.error('Error' + error)
          setErrorDel(error.response.data)
        })
        
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };


  const handleCancel = () => {
    try {
      apiClient.delete(`/user/dashboard/cancel/${idOrder}/`)
        .then(response => { 
          console.log(response.data)
          fetchPayed();
        })
        .catch (error => {
          console.error('Error' + error)
          setErrorDel(error.response.data)
        })
        
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    const address_or_tables = e.target.address_or_tables.value;
    const phone_number = e.target.phone.value;
    const total_pay = totalPrice;

    try {
      apiClient.post(`/user/dashboard/pay/${idCard}/`, { 
        address_or_tables,
        phone_number,
        total_pay,
        payed: false
      })
        .then(response => {
          console.log('Comprado');
          console.log(response.data)
          fetchOrderId(response.data.id)
          fetchPayed();

        })
        .catch(error => {
          console.log(error.response.data)
          setErrors(error.response.data)
        })
      
    } catch {
      console.log("Error")
    }
  }

    return ( 
            <div className="bg-gray-100 flex flex-col max-w-10xl p-6 space-y-4 sm:p-10 dark:text-gray-100 my-9">
                <h2 className=" text-center text-3xl dark:text-black font-bold">Your cart</h2>
                <ul className="flex flex-col divide-y divide-gray-700">
                    {errorDel.detail && (
                      <div className='text-red-500 text-sm mb-2'>
                        {errorDel.detail}
                      </div>
                    )}
                    {dashBoard.map((item, index) => (
                      idCard = item.id,
                      item.order.map((food, ix) => (                        
                        <li key={ix} className="flex flex-col py-6 sm:flex-row sm:justify-between">
                          <ItemCard 
                            ix={ix}
                            image={food.food.food_image} 
                            name={food.food.food_name}
                            price={food.food.price}
                            quantity={food.quantity}
                            handleDelete={() => handleDelete(food.id)}
                          />
                        </li>
                    ))
                    ))}
                </ul>
                <div className="space-y-6">
                  <div className="flex justify-between">
                    <span className="dark:text-black">Total</span>
                    <span className="font-semibold dark:text-black">{totalPrice}</span>
                  </div>
                  <Modal style='w-96 py-2 font-semibold border rounded dark:bg-violet-400 dark:text-gray-900 dark:border-violet-400' title='Go to checkout'>
                    {
                      payed ?
                      <div className="flex rounded-lg  overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
                          <div className=" rounded-md p-6">
                              <h2 className="my-3 text-center text-2xl font-bold tracking-tight text-gray-900">
                                Su compra se ha realizado con éxito

                              </h2>
                              <div className="mt-8">
                                  <button type="submit" onClick={handleCancel} className="bg-gray-700 text-white font-medium py-2 px-4 w-full rounded hover:bg-gray-600">Cancelar Pedido</button>
                              </div>
                          </div>
                    </div>

                    :
                    <div className="flex rounded-lg  overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
                          <div className=" rounded-md p-6">
                              <h2 className="my-3 text-center text-2xl font-bold tracking-tight text-gray-900">
                                Ingrese sus datos de compra
                              </h2>
                              <form onSubmit={handlePayment} method="post">
                                {errors.detail && (
                                  <div className='text-red-500 text-sm mb-2 max-w-xs'>
                                    {errors.detail}
                                  </div>
                                )}
                              <div className="mt-4 flex items-center justify-between">
                                  <span className="border-b w-1/5 lg:w-1/4"></span>
                                  <a href="#" className="text-xs text-center text-gray-500 uppercase"></a>
                                  <span className="border-b w-1/5 lg:w-1/4"></span>
                              </div>
                              <div className=" hidden">
                                  
                              </div>
                          
                              <div className="mt-4">
                                  <div className="flex justify-between">
                                      <label className="block text-gray-700 text-sm font-medium mb-2">Domicilio</label>
                                  </div>
                                  <input type="text" name="address_or_tables" className="text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none" required />
                              </div>
                              <div className="mt-4">
                                  <div className="flex justify-between">
                                      <label className="block text-gray-700 text-sm font-medium mb-2">Número de teléfono</label>
                                  </div>
                                  <input type="number" name="phone" className="text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none" required />
                              </div>
                              <SubmitButton 
                                text='Realizar pedido'
                                />
                            </form>
                          </div>
                    </div>
                }
                  </Modal>
                </div>
            </div>
    )
}