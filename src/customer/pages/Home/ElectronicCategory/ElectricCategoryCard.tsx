import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HomeCategory } from "../../../../types/HomeCategoryType";

const ElectricCategoryCard = ({item}: {item: HomeCategory}) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/products?category=${item.categoryId}`);
    };

    return (
        <div 
            className='flex flex-col gap-2 justify-center cursor-pointer hover:opacity-80 transition-opacity'
            onClick={handleClick}
        >
            <img className='object-contain h-10' src={item.image} alt={item.name} />
            <h2 className='font-semibold text-sm text-center'>{item.name}</h2>
        </div>
    );
};

export default ElectricCategoryCard;
