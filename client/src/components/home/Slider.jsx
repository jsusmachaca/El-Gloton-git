import React, { useEffect, useState } from 'react';
import image_1 from '../../assets/images/transition_1.jpg';
import image_4 from '../../assets/images/transition_5.jpg';
import image_5 from '../../assets/images/pollo.jpg';
import image_6 from '../../assets/images/pollo2.jpg';
import image_7 from '../../assets/images/pollo3.jpg';
import { Tags } from './Tags';

export const Slider = () => {
  const data = [image_1, image_4, image_5, image_6, image_7];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prevCurrent) =>
        prevCurrent === 5 - 1 ? 0 : prevCurrent + 1
      );
    }, 3500);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className='w-full overflow-hidden relative shadow-md'>
      {data.map((dat, index) => (
        <div
          key={index}
          className={` h-[41rem] ${
            index === current ? 'block' : 'hidden'
          }`}
          >
          <img src={dat} alt='item' className=' w-full h-full' />
        </div>
      ))}
      <div className='bg-black p-7 flex items-center justify-center z-20 top-0 left-0 h-full w-full'>
        <Tags />
      </div>

    </div>
    
  );
};

