import React from 'react';
import ElectricCategory from "./ElectronicCategory/ElectricCategory";
import CategoryGrid from "./CategoryGrid";
import Deal from "./Deal/Deal";
import ShopByCategory from "./ShopByCategory/ShopByCategory";

const Home = () => {
    return (
        <>
            <div className='space-y-5 lg:space-y-10 relative'>
                <ElectricCategory />
                <CategoryGrid/>
                <Deal/>
                <ShopByCategory/>
            </div>
            
        </>
    );
};

export default Home;
