import React from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Autoplay, Navigation, Pagination} from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const carouselImages = [
    'https://file.hstatic.net/200000722513/file/thang_03_laptop_rtx_5090_800x400.jpg',
    'https://file.hstatic.net/200000722513/file/thang_04_laptop_gaming_banner_web_slider_800x400.jpg',
    'https://file.hstatic.net/200000722513/file/thang_04_laptop_acer.png',
];

const gridImages = [
    'https://file.hstatic.net/200000722513/file/thang_02_layout_web_-01.png',
    'https://file.hstatic.net/200000722513/file/thang_02_layout_web_-02.png',
    'https://file.hstatic.net/200000722513/file/thang_02_layout_web_-04.png',
    'https://file.hstatic.net/200000722513/file/thang_02_layout_web_-07.png',
    'https://file.hstatic.net/200000722513/file/thang_02_layout_web_-08.png',
];

const CategoryGrid = () => {
    return (
        <div className='grid gap-4 grid-cols-12 grid-rows-12 lg:h-[600px] px-5 lg:px-20'>

            <div className='col-span-12 lg:col-span-8 row-span-8 rounded-md overflow-hidden shadow-md'>
                <Swiper
                    modules={[Autoplay, Pagination, Navigation]}
                    slidesPerView={1}
                    autoplay={{delay: 3000}}
                    loop
                    pagination={{clickable: true}}
                    navigation={false}
                    className="h-full relative"
                >
                    {carouselImages.map((img, index) => (
                        <SwiperSlide key={index}>
                            <img
                                src={img}
                                alt={`Slide ${index + 1}`}
                                className="w-full h-full object-cover object-top"
                            />
                        </SwiperSlide>
                    ))}

                    <div className="swiper-pagination !bottom-2 !text-primary-color"/>
                </Swiper>

            </div>

            {gridImages.map((src, index) => (
                <div
                    key={index}
                    className={`col-span-12 sm:col-span-6 lg:col-span-4 row-span-4 rounded-md overflow-hidden shadow-sm`}
                >
                    <img
                        src={src}
                        alt={`Category ${index + 1}`}
                        className='w-full h-full object-cover object-top'
                    />
                </div>
            ))}
        </div>
    );
};

export default CategoryGrid;
