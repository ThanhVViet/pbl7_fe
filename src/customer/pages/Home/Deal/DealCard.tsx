import React from 'react';
import {Deal} from "../../../../types/DealType";

const DealCard = ({item}:{item:Deal}) => {
    return (
        <div className='w-[13em] cursor-pointer'>
            <img className='w-full h-[12rem] border-x-[7px] border-t-[7px] border-pink-600 object-cover
            object-top' src={item.category.image} alt=''/>
            <div className='border-4 border-black bg-black text-white p-2 text-center'>
                <p className='text-lg font-semibold'>{item.category.name}</p>
                <p className='text-2xl font-bold'>{item.discount}</p>
                <p className='text-lg text-balance'>buy now</p>
            </div>
        </div>
    );
};

export default DealCard;
