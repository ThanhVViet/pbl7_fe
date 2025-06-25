import React, {useEffect, useState} from 'react';
import StarIcon from '@mui/icons-material/Star';
import {teal} from "@mui/material/colors";
import {Button, Divider} from "@mui/material";
import {
    AddShoppingCart,
    Favorite,
    FavoriteBorder,
    LocalShipping,
    Remove,
    Shield,
    Wallet,
    WorkspacePremium
} from "@mui/icons-material";
import AddIcon from '@mui/icons-material/Add';
import SimilarProduct from "../Product/SimilarProduct";
import ReviewCard from "../Review/ReviewCard";
import {useAppDispatch, useAppSelector} from "../../../state/store";
import {useParams} from "react-router-dom";
import {fetchProductById} from "../../../state/customer/ProductSlice";
import {addItemToCart} from "../../../state/customer/CartSlice";
import ZoomImage from "../../components/ZoomImage";
import { motion, AnimatePresence } from 'framer-motion';
import {getAllInventory} from '../../../state/admin/InventorySlice';
import { toast } from 'sonner';

const ProductDetails = () => {
    const [quantity, setQuantity] = useState(1)
    const dispatch = useAppDispatch()
    const {productId} = useParams()
    const {product} = useAppSelector(store => store)
    const [activeImage, setActiveImage] = useState(0)
    const {auth} = useAppSelector(store => store)
    const {inventory} = useAppSelector(store => store.inventory)
    let specsTable: React.ReactNode = null;

    useEffect(() => {
        dispatch(fetchProductById({productId: Number(productId), jwt: localStorage.getItem('jwt') || ''}))
        dispatch(getAllInventory())
    }, [productId]);

    const inventoryItem = Array.isArray(inventory)
        ? inventory.find((item: any) => item.productId === Number(productId))
        : null;

    const handleAddItemToCart = (e: any) => {
        if (!inventoryItem || inventoryItem.quantity === 0) {
            toast.error('Sản phẩm đã hết hàng!');
            return;
        }
        const request = {
            productId: productId ? Number(productId) : undefined,
            quantity,
            color: product?.product?.color || "black"
        }
        dispatch(addItemToCart({jwt: auth.jwt || '', request: request}))
        console.log('cart', request)
    }

    const handleActiveImage = (index: number) => {
        setActiveImage(index)
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.5,
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 }
        }
    };

    let specs: any = product?.product?.specs;
    if (typeof specs === 'string') {
        try {
            specs = JSON.parse(specs);
        } catch (e) {
            specs = null;
        }
    }
    if (specs && typeof specs === 'object') {
        specsTable = (
            <motion.div className='mt-8 w-full' variants={itemVariants}>
                <h2 className='text-2xl font-bold mb-4'>Thông tin sản phẩm</h2>
                <h3 className='text-lg font-semibold mb-2'>Thông số kĩ thuật:</h3>
                <div>
                    <table className='w-full border border-gray-200 rounded-lg'>
                        <tbody>
                            {Object.entries(specs).map(([key, value]) => (
                                <tr key={key}>
                                    <td className='px-4 py-2 font-semibold text-blue-700 whitespace-nowrap border border-gray-100'>{key}</td>
                                    <td className='px-4 py-2 border border-gray-100'>{String(value)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        );
    } else if (!specs && product?.product?.description) {
        try {
            const descSpecs = JSON.parse(product.product.description);
            if (descSpecs && typeof descSpecs === 'object') {
                specsTable = (
                    <motion.div className='mt-8' variants={itemVariants}>
                        <h2 className='text-2xl font-bold mb-4'>Thông tin sản phẩm</h2>
                        <h3 className='text-lg font-semibold mb-2'>Thông số kĩ thuật:</h3>
                        <div className='overflow-x-auto'>
                            <table className='min-w-[400px] border border-gray-200 rounded-lg'>
                                <tbody>
                                    {Object.entries(descSpecs).map(([key, value]) => (
                                        <tr key={key}>
                                            <td className='px-4 py-2 font-semibold text-blue-700 whitespace-nowrap border border-gray-100'>{key}</td>
                                            <td className='px-4 py-2 border border-gray-100'>{String(value)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </motion.div>
                );
            }
        } catch (e) {}
    }

    return (
        <motion.div 
            className='px-5 lg:px-20 pt-10'
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-10'>
                <motion.section 
                    className='flex flex-col gap-5'
                    variants={itemVariants}
                >
                    <div className='flex flex-col gap-6'>
                        <div className='flex flex-wrap gap-3'>
                            <AnimatePresence>
                                {product?.product?.images.map((item, index) => (
                                    <motion.img 
                                        key={index}
                                        onClick={() => handleActiveImage(index)}
                                        className='w-[80px] cursor-pointer border rounded-md'
                                        src={item}
                                        alt=''
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.3 }}
                                    />
                                ))}
                            </AnimatePresence>
                        </div>
                        <ZoomImage src={product?.product?.images[activeImage]}/>
                    </div>
                </motion.section>

                <motion.section
                    variants={itemVariants}
                >
                    <motion.p 
                        className='text-gray-500 font-semibold'
                        variants={itemVariants}
                    >
                        {product?.product?.title}
                    </motion.p>

                    <motion.div 
                        className='flex justify-between items-center py-2 border w-[180px] px-3 mt-5'
                        variants={itemVariants}
                    >
                        <div className='flex gap-1 items-center'>
                            <span>4</span>
                            <StarIcon sx={{color: teal[500], fontSize: "17px"}}/>
                        </div>
                        <Divider orientation='vertical' flexItem/>
                        <span>234 Đánh giá</span>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <motion.div 
                            className='price flex items-center gap-3 mt-5 text-2xl'
                            whileHover={{ scale: 1.05 }}
                        >
                            <span className='font-semibold text-gray-800'>
                                {new Intl.NumberFormat('vi-VN', {style: 'currency', currency: 'VND'}).format(product?.product?.sellingPrice ?? 0)}
                            </span>
                        </motion.div>
                        {/* <p className='text-sm mt-1'>Đã bao gồm thuế. Miễn phí vận chuyển cho đơn hàng trên 200$.</p> */}
                        <div className={`mt-2 ${inventoryItem?.quantity === 0 ? 'text-red-600 font-bold' : 'text-gray-500'}`}>
                          Số lượng còn lại: {inventoryItem?.quantity ?? 'Đang cập nhật'}
                        </div>
                        {product?.product?.color && (
                          <div className="text-gray-500 mt-2">
                            Màu sắc: <span className="font-semibold">{product.product.color}</span>
                          </div>
                        )}
                    </motion.div>

                    <motion.div 
                        className='mt-7 space-y-3'
                        variants={itemVariants}
                    >
                        {[
                            { icon: <Shield sx={{color: teal[500]}}/>, text: "Cam kết chính hãng & chất lượng" },
                            { icon: <WorkspacePremium sx={{color: teal[500]}}/>, text: "Đảm bảo hoàn tiền 100%" },
                            { icon: <LocalShipping sx={{color: teal[500]}}/>, text: "Miễn phí vận chuyển & đổi trả" },
                            { icon: <Wallet sx={{color: teal[500]}}/>, text: "Thanh toán khi nhận hàng" }
                        ].map((item, index) => (
                            <motion.div 
                                key={index}
                                className='flex items-center gap-4'
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ x: 10 }}
                            >
                                {item.icon}
                                <p>{item.text}</p>
                            </motion.div>
                        ))}
                    </motion.div>

                    <motion.div 
                        className='mt-7 space-y-2'
                        variants={itemVariants}
                    >
                        <h1>Số lượng</h1>
                        <div className='flex items-center gap-2 w-[140px] justify-between'>
                            <motion.div whileTap={{ scale: 0.9 }}>
                                <Button 
                                    variant='outlined' 
                                    disabled={quantity === 1}
                                    onClick={() => setQuantity(quantity - 1)}
                                >
                                    <Remove/>
                                </Button>
                            </motion.div>
                            <motion.span
                                key={quantity}
                                initial={{ scale: 1.5 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 0.2 }}
                            >
                                {quantity}
                            </motion.span>
                            <motion.div whileTap={{ scale: 0.9 }}>
                                <Button 
                                    variant='outlined' 
                                    onClick={() => setQuantity(quantity + 1)}
                                >
                                    <AddIcon/>
                                </Button>
                            </motion.div>
                        </div>
                    </motion.div>

                    <motion.div 
                        className='mt-12 flex items-center gap-5'
                        variants={itemVariants}
                    >
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full"
                        >
                            <Button 
                                variant='contained' 
                                fullWidth
                                sx={{ py: 2, fontWeight: 'bold', fontSize: 16 }}
                                onClick={handleAddItemToCart}
                                disabled={!inventoryItem || inventoryItem.quantity === 0}
                            >
                                THÊM VÀO GIỎ HÀNG
                            </Button>
                        </motion.div>

                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full"
                        >
                            <Button 
                                variant='outlined' 
                                fullWidth
                                sx={{ py: 2, fontWeight: 'bold', fontSize: 16 }}
                                startIcon={<FavoriteBorder/>}
                            >
                                THÊM VÀO YÊU THÍCH
                            </Button>
                        </motion.div>
                    </motion.div>

                    <motion.div 
                        className='mt-5'
                        variants={itemVariants}
                    >
                        <p>{product?.product?.description}</p>
                    </motion.div>

                    {/* <motion.div 
                        className='mt-12 space-y-5'
                        variants={itemVariants}
                    >
                        <ReviewCard/>
                        <Divider/>
                    </motion.div> */}
                </motion.section>
            </div>

            {/* Đặt bảng thông số kỹ thuật ra ngoài grid, chiếm toàn bộ chiều rộng trang */}
            <div className='w-full max-w-5xl mx-auto mt-10'>{specsTable}</div>

            <motion.div 
                className='mt-20'
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
            >
                <div className='pt-5'>
                    <SimilarProduct brand={product?.product?.brand}/>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default ProductDetails;
