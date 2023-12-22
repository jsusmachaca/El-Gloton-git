import React from "react";
import { DeleteButton } from "../actions/DeleteButton";

export const ItemCard = (props) => {
    return (
        <div className="flex w-full space-x-2 sm:space-x-4">
            <img className="flex-shrink-0 object-cover w-20 h-20 dark:border-transparent rounded outline-none sm:w-32 sm:h-32 dark:bg-gray-500" 
                src={props.image} 
                alt="Polaroid camera" />
            <div className="flex flex-col justify-between w-full pb-4">
                <div className="flex justify-between w-full pb-2 space-x-2">
                    <div className="space-y-1">
                        <h3 className="text-lg font-semibold leadi sm:pr-8 dark:text-black">{props.name}</h3>
                        <p className="text-sm dark:text-gray-400">Cantidad</p>
                    </div>

                    <div className="text-right">
                        <p className="text-lg font-semibold dark:text-black">S/. {props.price}</p>
                        <p className="text-lg dark:text-gray-400">{props.quantity}</p>
                    </div>
                </div>
                <div className="flex text-sm divide-x">
                    <DeleteButton 
                        action={props.handleDelete}
                        text='Remover'
                    />
                    <span type="button" className="flex items-center px-2 py-1 space-x-1">
                    </span>
                </div>
            </div>
        </div>
    )
}