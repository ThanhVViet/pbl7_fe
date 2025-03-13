import React from 'react';
import "./ShopByCategory.css"

const ShopByCategoryCard = () => {
    return (
        <div className='flex gap-3 flex-col items-center justify-center group cursor-pointer'>
            <div className='custome-border w-[150px] h-[150px] lg:w-[249px] lg:h-[249px] rounded-full bg-primary-color'>
                <img className='group-hover:scale-95 transition-transform transform-duration-700 object-cover object-top
                h-full w-full rounded-full'
                     src='https://metercube.com/wp-content/uploads/2024/05/3-3.jpg'
                     alt=''/>
            </div>
            <h1>kitchen & table</h1>
        </div>
    );
};

export default ShopByCategoryCard;
