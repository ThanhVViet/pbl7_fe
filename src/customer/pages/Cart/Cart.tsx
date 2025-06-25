import React, {useEffect, useState} from 'react';
import CartItemCard from "./CartItemCard";
import {Close, LocalOffer} from "@mui/icons-material";
import {teal} from "@mui/material/colors";
import {Button, IconButton, TextField} from "@mui/material";
import PricingCard from "./PricingCard";
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../state/store";
import {fetchUserCart} from "../../../state/customer/CartSlice";
import { motion, AnimatePresence } from 'framer-motion';

const Cart = () => {
    const navigate = useNavigate()
    const [couponCode, setCouponCode] = useState("")
    const dispatch = useAppDispatch()
    const {cart} = useAppSelector(store => store)

    const handleChange = (e: any) => {
        setCouponCode(e.target.value)
    }

    useEffect(() => {
        dispatch(fetchUserCart(localStorage.getItem('jwt') || ''))
    }, [])

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
            transition: { duration: 0.3 }
        }
    };

    return (
        <motion.div 
            className='pt-10 px-5 sm:px-10 md:px-60 min-h-screen'
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-5'>
                <motion.div 
                    className='cartItemSection lg:col-span-2 space-y-3'
                    variants={itemVariants}
                >
                    <AnimatePresence>
                        {cart?.cart?.items && cart.cart.items.length > 0 ? (
                            cart.cart.items.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                >
                                    <CartItemCard item={item} />
                                </motion.div>
                            ))
                        ) : (
                            <motion.div 
                                className="flex items-center justify-center h-full"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                <h1 className="text-lg text-gray-500">Giỏ hàng của bạn đang trống. </h1>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                <motion.div 
                    className='col-span-1 text-sm space-y-3'
                    variants={itemVariants}
                >
                    <motion.div 
                        className='border rounded-md px-5 py-3 space-y-5'
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                    >
                        <motion.div 
                            className='flex gap-3 text-sm items-center'
                            whileHover={{ x: 5 }}
                        >
                            <div className='flex gap-3 text-sm items-center'>
                                <LocalOffer sx={{color: teal[600], fontSize: "17px"}}/>
                            </div>
                            <span>Apply coupon</span>
                        </motion.div>

                        <AnimatePresence>
                            {true ? (
                                <motion.div 
                                    className='flex items-center justify-between'
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                >
                                    <TextField 
                                        onChange={handleChange} 
                                        variant='outlined' 
                                        placeholder='coupon code'
                                        size='small'
                                    />
                                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                        <Button size='small'>apply</Button>
                                    </motion.div>
                                </motion.div>
                            ) : (
                                <motion.div 
                                    className='flex'
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                >
                                    <div className='p-1 pl-5 pr-3 border rounded-md flex gap-2 items-center'>
                                        <span>V30 Applied</span>
                                        <motion.div whileHover={{ rotate: 90 }}>
                                            <IconButton size='small'>
                                                <Close className='text-red-600'/>
                                            </IconButton>
                                        </motion.div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>

                    <motion.div 
                        className='border rounded-md'
                        variants={itemVariants}
                    >
                        <PricingCard/>

                        <motion.div 
                            className='p-5'
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Button 
                                onClick={() => navigate("/checkout")} 
                                fullWidth 
                                variant='contained'
                                sx={{py: "11px"}}
                            >
                                Đặt hàng
                            </Button>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default Cart;
