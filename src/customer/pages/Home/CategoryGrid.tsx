import React from 'react';

const CategoryGrid = () => {
    return (
        <div className='grid gap-4 grid-rows-12 grid-cols-12 lg:h-[600px] px-5 lg:px-20'>
            <div className='col-span-3 row-span-12 text-white '>
                <img className='w-full h-full object-cover object-top rounded-md' src='https://m.media-amazon.com/images/S/aplus-media-library-service-media/f9e66efc-6454-43a7-bcd1-c47a85c47957.__CR0,0,362,453_PT0_SX362_V1___.jpg' alt=''/>

            </div>

            <div className='col-span-2 row-span-6 text-white'>
                <img className='w-full h-full object-cover object-top rounded-md' src='https://m.media-amazon.com/images/I/61SmAQwsLAL._AC_UL640_FMwebp_QL65_.jpg' alt=''/>

            </div>

            <div className='col-span-4 row-span-6 text-white '>
                <img className='w-full h-full object-cover object-top rounded-md' src='https://www.themodelbuilders.co.uk/wp-content/uploads/2022/03/shutterstock_138987470.jpg' alt=''/>

            </div>

            <div className='col-span-3 row-span-12 text-white '>
                <img className='w-full h-full object-cover object-top rounded-md' src='' alt=''/>

            </div>

            <div className='col-span-4 row-span-6 text-white '>
                <img className='w-full h-full object-cover object-top rounded-md' src='' alt=''/>

            </div>

            <div className='col-span-2 row-span-6 text-white '>
                <img className='w-full h-full object-cover object-top rounded-md' src='' alt=''/>

            </div>
        </div>
    );
};

export default CategoryGrid;



