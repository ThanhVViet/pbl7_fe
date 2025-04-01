import React from 'react';
import ElectricCategoryCard from "./ElectricCategoryCard";
import {useAppSelector} from "../../../../state/store";

const ElectricCategory = () => {

    const {customer} = useAppSelector(store => store)
    return (
        <div className='flex flex-wrap justify-between py-5 lg:px-20 border-b'>
            {
                customer?.homePageData?.electricCategories.slice(0,7).map(((item, index) =>  <ElectricCategoryCard
                    item={item}
                    key={index} />))
            }

        </div>
    );
};

export default ElectricCategory;
