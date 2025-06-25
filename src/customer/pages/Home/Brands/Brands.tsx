import React from 'react';
import { brand } from '../../../../data/brand';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';

const Brands = () => {
    const navigate = useNavigate();

    const handleBrandClick = (brandId: string) => {
        navigate(`/products?brand=${brandId}`);
    };

    return (
        <div className="py-10 px-4 lg:px-20">
            <h2 className="text-2xl lg:text-4xl font-bold text-primary-color pb-8 text-center">
                Sản phẩm đến từ các thương hiệu lớn
            </h2>
            <Swiper
                modules={[Autoplay, Navigation]}
                spaceBetween={30}
                slidesPerView={2}
                navigation
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                breakpoints={{
                    640: {
                        slidesPerView: 3,
                    },
                    768: {
                        slidesPerView: 4,
                    },
                    1024: {
                        slidesPerView: 5,
                    },
                }}
                className="brand-swiper"
            >
                {brand.map((item) => (
                    <SwiperSlide key={item.id}>
                        <div 
                            className="flex flex-col items-center justify-center p-4 hover:scale-105 transition-transform duration-300 cursor-pointer"
                            onClick={() => handleBrandClick(item.id)}
                        >
                            <div className="w-32 h-32 relative">
                                <img 
                                    src={item.image} 
                                    alt={item.name}
                                    className="w-full h-full object-contain"
                                />
                            </div>
                            <h3 className="mt-4 text-lg font-semibold text-gray-700">{item.name}</h3>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Brands; 