import React, { useState } from "react";
import { createPortal } from "react-dom";
import { useEffect } from "react";


const portalRoot = document.getElementById('portal')

export const Portal = (props) => {
    const el = document.createElement('div');

    useEffect(() => {
      portalRoot.appendChild(el);
      return () => {
        portalRoot.removeChild(el);
      };
    }, [el]);
  
    return createPortal(
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
        <div className='bg-black bg-opacity-50 absolute inset-0' style={{ pointerEvents: 'none' }}></div>
        <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 shadow-lg rounded-lg' style={{pointerEvents: 'auto'}}>
            {props.children}
        </div>
      </div>
    , el);
  };
  

