import React, {useEffect} from 'react';
import {Box, Button, Divider} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import OrderStepper from "./OrderStepper";
import PaymentIcon from '@mui/icons-material/Payment';
import {useAppDispatch, useAppSelector} from "../../../state/store";
import {fetchOrderById, fetchOrderItemById} from "../../../state/customer/OrderSlice";

const OrderDetails = () => {

    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const {orderId, orderItemId} = useParams()
    const {orderItem, currentOrder} = useAppSelector(store => store.order)

    const handleCancelOrder = () => {

    }

    useEffect(() => {
        dispatch(fetchOrderById({orderId: Number(orderId), jwt: localStorage.getItem('jwt') || ''}))
        dispatch(fetchOrderItemById({ orderItemId: Number(orderItemId), jwt: localStorage.getItem('jwt') || ''}))
    }, []);
    return (
        <Box className='space-y-5'>
            <section className='flex flex-col gap-5 justify-center items-center'>
                <img className='w-[100px]' src={orderItem?.product.images[0]} alt=''/>

                <div className='text-sm space-y-1 text-center'>
                    <h1 className='font-bold'>
                        {orderItem?.product?.seller?.businessDetails?.businessName}
                    </h1>
                    <p>{orderItem?.product?.title}</p>
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
                        <p>{currentOrder?.shippingAddress?.name}</p>

                        <Divider flexItem orientation='vertical'/>
                        <p>{currentOrder?.shippingAddress?.mobile}</p>
                    </div>

                    <p>
                        {currentOrder?.shippingAddress?.address}, {''}
                        {currentOrder?.shippingAddress?.state}, {''}
                        {currentOrder?.shippingAddress?.city}, {''}
                        - {currentOrder?.shippingAddress?.pinCode}
                    </p>
                </div>
            </div>

            <div className='border space-y-4'>
                <div className='flex justify-between text-sm pt-5 px-5'>
                    <div className='space-y-1'>
                        <p className='font-bold'>total item price</p>
                        <p>you saved <span className='text-green-500 font-medium text-xs'>$30</span> on this item</p>
                    </div>
                    <p className='font-medium'>${orderItem?.sellingPrice}</p>
                </div>

                <div className='px-5'>
                    <div className='bg-teal-50 px-5 py-2 text-xs font-medium flex items-center gap-3'>
                        <PaymentIcon />
                        <p>pay on delivery</p>
                    </div>
                </div>

                <Divider />

                <div className='px-5 pb-5'>
                    <p className='text-xs'><strong>sold by: </strong>{orderItem?.product?.seller?.businessDetails?.businessName}</p>
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
