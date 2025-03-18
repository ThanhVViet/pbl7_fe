import React from 'react';
import {Box, Button, Divider} from "@mui/material";
import {useNavigate} from "react-router-dom";
import OrderStepper from "./OrderStepper";
import PaymentIcon from '@mui/icons-material/Payment';

const OrderDetails = () => {
    const navigate = useNavigate()

    const handleCancelOrder = () => {

    }
    return (
        <Box className='space-y-5'>
            <section className='flex flex-col gap-5 justify-center items-center'>
                <img className='w-[100px]' src='https://m.media-amazon.com/images/I/71rJtghEonS._AC_SY879_.jpg' alt=''/>

                <div className='text-sm space-y-1 text-center'>
                    <h1 className='font-bold'>
                        name
                    </h1>
                    <p>detail</p>
                    <p><strong>size: </strong>L</p>
                </div>

                <div>
                    <Button onClick={() => navigate(``)}>
                        write review
                    </Button>
                </div>
            </section>

            <section className='border p-5'>
                <OrderStepper orderStatus = {'SHIPPED'}/>
            </section>

            <div className='border p-5'>
                <h1 className='font-bold pb-3'>delivery address</h1>
                <div className='text-sm space-y-2'>
                    <div className='flex gap-5 font-medium'>
                        <p>name</p>

                        <Divider flexItem orientation='vertical'/>
                        <p>mobile</p>
                    </div>

                    <p>
                        detail
                    </p>
                </div>
            </div>

            <div className='border space-y-4'>
                <div className='flex justify-between text-sm pt-5 px-5'>
                    <div className='space-y-1'>
                        <p className='font-bold'>total item price</p>
                        <p>you saved <span className='text-green-500 font-medium text-xs'>$30</span> on this item</p>
                    </div>
                    <p className='font-medium'>$39</p>
                </div>

                <div className='px-5'>
                    <div className='bg-teal-50 px-5 py-2 text-xs font-medium flex items-center gap-3'>
                        <PaymentIcon />
                        <p>pay on delivery</p>
                    </div>
                </div>

                <Divider />

                <div className='px-5 pb-5'>
                    <p className='text-xs'><strong>sold by: </strong>v clothing</p>
                </div>

                <div className='p-10'>
                    <Button onClick={handleCancelOrder} disabled={true} fullWidth color='error' sx={{py:"0.7rem"}} variant='outlined'>
                        {true ? "order cancelled" : "cancel order"}
                    </Button>
                </div>
            </div>
        </Box>
    );
};

export default OrderDetails;
