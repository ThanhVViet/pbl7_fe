import React, {useEffect} from 'react';
import OrderItemCard from "./OrderItemCard";
import {useAppDispatch, useAppSelector} from "../../../state/store";
import {fetchUserOrderHistory} from "../../../state/customer/OrderSlice";

const Order = () => {

    const dispatch = useAppDispatch()
    const {orders} = useAppSelector(store => store.order)

    useEffect(() => {
        dispatch(fetchUserOrderHistory(localStorage.getItem('jwt') || ''))
    }, []);
    return (
        <div className='text-sm min-h-screen'>
            <div className='pb-5'>
                <h1 className='font-semibold'>all orders</h1>
                <p>from anytime</p>
            </div>
            <div className='space-y-2'>
                {
                    orders?.map((order) => order.orderItems.map((item) =>
                    <OrderItemCard order={order} key={item.id} item ={item}/>))
                }
            </div>
        </div>
    );
};

export default Order;
