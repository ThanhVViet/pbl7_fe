import React from 'react';
import OrderItem from "./OrderItem";

const Order = () => {
    return (
        <div className='text-sm min-h-screen'>
            <div className='pb-5'>
                <h1 className='font-semibold'>all orders</h1>
                <p>from anytime</p>
            </div>
            <div className='space-y-2'>
                {
                    [1,1,1].map((item) => <OrderItem/>)
                }
            </div>
        </div>
    );
};

export default Order;
