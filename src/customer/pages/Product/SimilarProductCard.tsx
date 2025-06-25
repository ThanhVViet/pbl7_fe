import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const SimilarProductCard = ({ item }: { item: any }) => {
    const { title, sellingPrice, price, images, id } = item;
    const discount = price ? Math.round(((price - sellingPrice) / price) * 100) : 0;
    const navigate = useNavigate();

    return (
        <motion.div
            className="bg-white rounded-xl shadow-sm overflow-hidden h-full"
            whileHover={{ 
                scale: 1.02,
                boxShadow: "0 10px 20px rgba(0,0,0,0.1)"
            }}
            onClick={() => navigate(`/product/${id}`)}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
            <motion.div 
                className="relative aspect-square bg-gray-50"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
            >
                <motion.img
                    src={images?.[0]}
                    alt={title}
                    className="absolute inset-0 w-full h-full object-contain p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                />
                {discount > 0 && (
                    <motion.div
                        className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-medium"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ 
                            type: "spring",
                            stiffness: 500,
                            damping: 30,
                            delay: 0.2
                        }}
                    >
                        -{discount}%
                    </motion.div>
                )}
            </motion.div>

            <div className="p-4 space-y-2">
                <motion.h3 
                    className="text-sm font-medium text-gray-900 line-clamp-2 min-h-[2.5rem]"
                    whileHover={{ color: "#009688" }}
                >
                    {title}
                </motion.h3>

                <div className="space-y-1">
                    <motion.div 
                        className="text-lg font-bold text-primary-color"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(sellingPrice)}
                    </motion.div>

                    {price && price > sellingPrice && (
                        <div className="flex items-center gap-2">
                            <motion.span 
                                className="text-sm line-through text-gray-400"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 0.7 }}
                                transition={{ delay: 0.2 }}
                            >
                                {new Intl.NumberFormat('vi-VN', {style: 'currency', currency: 'VND'}).format(price)}
                            </motion.span>
                        </div>
                    )}
                </div>

                <motion.div 
                    className="pt-2 flex items-center gap-2 text-sm text-gray-600"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <motion.div 
                        className="flex items-center gap-1"
                        whileHover={{ scale: 1.05 }}
                    >
                        <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span>4.5</span>
                    </motion.div>
                    <span>•</span>
                    <span>Đã bán 100+</span>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default SimilarProductCard;
