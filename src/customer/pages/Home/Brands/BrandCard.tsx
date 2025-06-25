import React from 'react';

interface BrandCardProps {
    brand: {
        id: string;
        name: string;
        image: string;
    }
}

const BrandCard: React.FC<BrandCardProps> = ({ brand }) => {
    return (
        <div className="flex flex-col items-center justify-center p-4 hover:scale-105 transition-transform duration-300">
            <div className="w-32 h-32 relative">
                <img 
                    src={brand.image} 
                    alt={brand.name}
                    className="w-full h-full object-contain"
                />
            </div>
            <h3 className="mt-2 text-lg font-semibold text-gray-700">{brand.name}</h3>
        </div>
    );
};

export default BrandCard; 