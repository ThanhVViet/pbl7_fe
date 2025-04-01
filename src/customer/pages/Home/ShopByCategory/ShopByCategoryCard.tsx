import React from 'react';
import "./ShopByCategory.css"
import {HomeCategory} from "../../../../types/HomeCategoryType";

const ShopByCategoryCard = ({item}:{item:HomeCategory}) => {
    return (
        <div className='flex gap-3 flex-col items-center justify-center group cursor-pointer'>
            <div className='custome-border w-[150px] h-[150px] lg:w-[249px] lg:h-[249px] rounded-full bg-primary-color'>
                <img className='group-hover:scale-95 transition-transform transform-duration-700 object-cover object-top
                h-full w-full rounded-full'
                     src={item.image}
                     alt=''/>
            </div>
            <h1>{item.name}</h1>
        </div>
    );
};

export default ShopByCategoryCard;
