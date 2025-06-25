import React, {useEffect, useState} from "react";
import {Avatar, Badge, Box, Button, IconButton, useMediaQuery, useTheme} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import {AddShoppingCart, FavoriteBorder, ShoppingCart, Storefront} from "@mui/icons-material";
import {useLocation, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../state/store";
import {homeCategories} from "../../data/homeCategories";
import {fetchUserCart} from "../../state/customer/CartSlice";
import SearchBox from "./SearchBox";
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const navigate = useNavigate()
    const theme = useTheme()
    const isLarge = useMediaQuery(theme.breakpoints.up("lg"))
    const dispatch = useAppDispatch()
    const location = useLocation()

    const {auth, cart} = useAppSelector(store => store)

    useEffect(() => {
        if (auth.jwt) {
            dispatch(fetchUserCart(auth.jwt));
        }
    }, [auth.jwt]);

    const navbarAnimation = {
        hidden: { y: -50 },
        visible: {
            y: 0,
            transition: {
                duration: 0.5,
                type: "spring" as "spring",
                stiffness: 100
            }
        }
    };

    const itemAnimation = {
        hover: { scale: 1.05, color: theme.palette.primary.main }
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={navbarAnimation}
        >
            <Box className='sticky top-0 left-0 right-0 bg-white' sx={{zIndex: 2}}>
                <div className='flex items-center justify-between px-5 lg:px-20 h-[70px] border-b'>
                    <div className='flex items-center gap-9'>
                        <motion.div 
                            className='flex items-center gap-2'
                            whileHover={{ scale: 1.02 }}
                        >
                            {!isLarge && (
                                <motion.div whileTap={{ scale: 0.95 }}>
                                    <IconButton>
                                        <MenuIcon/>
                                    </IconButton>
                                </motion.div>
                            )}
                            <motion.h1 
                                onClick={() => navigate('/')}
                                className='logo cursor-pointer text-lg md:text-2xl text-primary-color'
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                VGear
                            </motion.h1>

                            {auth.roles.includes('ADMIN') && (
                                <motion.h1 
                                    onClick={() => navigate('/admin')}
                                    className='logo cursor-pointer text-lg md:text-2xl text-primary-color'
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    admin
                                </motion.h1>
                            )}
                        </motion.div>

                        <motion.div 
                            className='flex items-center gap-2'
                            variants={itemAnimation}
                            whileHover="hover"
                        >
                            <motion.h1 
                                onClick={() => navigate('/products')}
                                className='cursor-pointer text-gray-800 font-medium'
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Danh sách sản phẩm
                            </motion.h1>
                        </motion.div>

                        {/*<ul className='flex items-center font-medium text-gray-800 cursor-pointer'>*/}
                        {/*    {homeCategories?.slice(0, 3).map((item) => {*/}
                        {/*        const isActive = location.pathname === `/products/${item.categoryId}`;*/}
                        {/*        return (*/}
                        {/*            <motion.li*/}
                        {/*                key={item.categoryId}*/}
                        {/*                className={`mainCategory h-[70px] px-4 flex items-center*/}
                        {/*                    ${isActive ? 'text-primary-color border-b-2 border-primary-color' : ''}*/}
                        {/*                `}*/}
                        {/*                onClick={() => navigate(`/products/${item.categoryId}`)}*/}
                        {/*                whileHover={{ */}
                        {/*                    scale: 1.05,*/}
                        {/*                    color: theme.palette.primary.main,*/}
                        {/*                    borderBottom: isActive ? '' : '2px solid ' + theme.palette.primary.main*/}
                        {/*                }}*/}
                        {/*                whileTap={{ scale: 0.95 }}*/}
                        {/*            >*/}
                        {/*                {item.name}*/}
                        {/*            </motion.li>*/}
                        {/*        );*/}
                        {/*    })}*/}
                        {/*</ul>*/}
                    </div>

                    <motion.div 
                        className='flex gap-1 lg:gap-6 items-center'
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <SearchBox/>

                        <AnimatePresence>
                            {auth.jwt ? (
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Button onClick={() => navigate("/account/orders")} className='flex items-center gap-2'>
                                        <Avatar sx={{width: 29, height: 29}} src=''/>
                                        <h1 className='font-semibold hidden lg:block'>{auth?.user?.username}</h1>
                                    </Button>
                                </motion.div>
                            ) : (
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Button onClick={() => navigate('/login')} variant='contained'>Login</Button>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                            <IconButton onClick={() => navigate('/wishlist')}>
                                <FavoriteBorder sx={{fontSize: 29}}/>
                            </IconButton>
                        </motion.div>

                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                            <IconButton onClick={() => navigate('/cart')}>
                                <Badge color="primary" badgeContent={cart?.cart?.items?.length || 0}>
                                    <ShoppingCart className="text-gray-700" sx={{fontSize: 29}}/>
                                </Badge>
                            </IconButton>
                        </motion.div>
                    </motion.div>
                </div>
            </Box>
        </motion.div>
    );
};

export default Navbar;
