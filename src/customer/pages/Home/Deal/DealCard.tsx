import React from 'react';

const DealCard = () => {
    return (
        <div className='w-[13em] cursor-pointer'>
            <img className='w-full h-[12rem] border-x-[7px] border-t-[7px] border-pink-600 object-cover
            object-top' src='https://soundpeatsvietnam.com/wp-content/uploads/2024/03/%E7%94%BB%E6%9D%BF-1.jpg' alt=''/>
            <div className='border-4 border-black bg-black text-white p-2 text-center'>
                <p className='text-lg font-semibold'>smart watch</p>
                <p className='text-2xl font-bold'>20% off</p>
                <p className='text-lg text-balance'>buy now</p>
            </div>
        </div>
    );
};

export default DealCard;
