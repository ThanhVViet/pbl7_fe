import React, { useEffect } from 'react';
import SimilarProductCard from "./SimilarProductCard";
import { useAppDispatch, useAppSelector } from "../../../state/store";
import { getAllProduct } from "../../../state/customer/ProductSlice";
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../../styles/swiper.css';

const SimilarProduct = ({ brand }: { brand: any }) => {
    const dispatch = useAppDispatch();
    const { product } = useAppSelector((state) => state);

    useEffect(() => {
        const filter = {
            brand,
            pageNumber: 0,
            pageSize: 8
        };
        dispatch(getAllProduct(filter));
    }, [brand]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const titleVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring" as "spring",
                stiffness: 300,
                damping: 30
            }
        }
    };

    return (
        <motion.div 
            className="py-10 px-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.div 
                className="max-w-7xl mx-auto"
                variants={titleVariants}
            >
                <div className="mb-8 border-b pb-4">
                    <motion.div
                        className="flex items-center gap-2"
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <motion.h2 
                            className="text-2xl font-bold text-gray-800"
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 400 }}
                        >
                            Các sản phẩm tương tự
                        </motion.h2>
                        <motion.span
                            className="text-sm text-gray-500"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            ({product?.products?.length || 0} sản phẩm)
                        </motion.span>
                    </motion.div>
                </div>

                <Swiper
                    modules={[Navigation, Pagination, A11y, Autoplay]}
                    spaceBetween={24}
                    navigation
                    pagination={{ clickable: true }}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    breakpoints={{
                        0: {
                            slidesPerView: 1,
                        },
                        640: {
                            slidesPerView: 2,
                        },
                        768: {
                            slidesPerView: 3,
                        },
                        1024: {
                            slidesPerView: 4,
                        },
                    }}
                    className="pb-12"
                >
                    {product?.products?.map((item, index) => (
                        <SwiperSlide key={index}>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ 
                                    delay: index * 0.1,
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 30
                                }}
                            >
                                <SimilarProductCard item={item} />
                            </motion.div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </motion.div>
        </motion.div>
    );
};

export default SimilarProduct;
