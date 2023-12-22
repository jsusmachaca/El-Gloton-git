import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Portal } from "./Portal";

export const Modal = (props) => {
    const [showModal, setShowModal] = useState(false);

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);
  

    return(
        <>
            <button onClick={openModal} className={props.style} >{props.title}</button>
            {showModal && (
                <Portal>
                <>
                    <button onClick={closeModal} className='absolute top-0 right-0 m-2 text-gray-500'>X</button>
                    {props.children}
                </>
                </Portal>
            )}
        </>
    )
}