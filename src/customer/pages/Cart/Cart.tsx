import React, {useEffect, useState} from 'react';
import CartItemCard from "./CartItemCard";
import {Close, LocalOffer} from "@mui/icons-material";
import {teal} from "@mui/material/colors";
import {Button, IconButton, TextField} from "@mui/material";
import PricingCard from "./PricingCard";
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../state/store";
import {fetchUserCart} from "../../../state/customer/CartSlice";

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

    return (
        <div className='pt-10 px-5 sm:px-10 md:px-60 min-h-screen'>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-5'>
                <div className='cartItemSection lg:col-span-2 space-y-3'>
                    {
                        cart?.cart?.cartItems?.map((item, index) => <CartItemCard item = {item} key={index}/>)
                    }
                </div>
                <div className='col-span-1 text-sm space-y-3'>
                    <div className='border rounded-md px-5 py-3 space-y-5'>
                        <div className='flex gap-3 text-sm items-center'>
                            <div className='flex gap-3 text-sm items-center'>
                                <LocalOffer sx={{color: teal[600], fontSize: "17px"}}/>
                            </div>
                            <span>
                            Apply coupon
                        </span>
                        </div>

                        {
                            true ?
                                <div className='flex items-center justify-between'>
                                    <TextField onChange={handleChange} variant='outlined' placeholder='coupon code'
                                               size='small'/>
                                    <Button size='small'>apply</Button>
                                </div>
                                :
                                <div className='flex'>
                                    <div className='p-1 pl-5 pr-3 border rounded-md flex gap-2 items-center'>
                                        <span>
                                            V30 Applied
                                        </span>
                                        <IconButton size='small'>
                                            <Close className='text-red-600'/>
                                        </IconButton>
                                    </div>
                                </div>
                        }


                    </div>

                    <div className='border rounded-md '>
                        <PricingCard />

                        <div className='p-5'>
                            <Button onClick={() => navigate("/checkout")} fullWidth variant='contained' sx={{py:"11px"}}>
                                order now
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Cart;
