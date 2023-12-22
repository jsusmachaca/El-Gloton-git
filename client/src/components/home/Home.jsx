import { Items } from './Items';
import { Slider } from './Slider';

export const Home = (props) => {
  
  return (
    <div className='bg-gray-100'>
      <Slider />
      <div className='home-container'>
        <div className='mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8'>
          <div className='mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8'>
            {props.localData.map((item, index) => (
              <Items 
              key={index}
              id={item.id}
              image={item.image}
              title={item.food_name}
              price={item.price}
              />
              ))}
          </div>
        </div>
      </div>
    </div>
  );

}