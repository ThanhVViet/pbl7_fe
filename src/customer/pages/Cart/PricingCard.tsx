import React from 'react';
import {Divider} from "@mui/material";

const PricingCard = () => {
    return (
        <>
            <div className='space-y-3 p-5'>
                <div className='flex justify-between items-center'>
                <span>
                    subtotal
                </span>

                    <span>
                    $99
                </span>
                </div>

                <div className='flex justify-between items-center'>
                <span>
                    discount
                </span>

                    <span>
                    $180
                </span>
                </div>

                <div className='flex justify-between items-center'>
                <span>
                    shipping
                </span>

                    <span>
                    $5
                </span>
                </div>

                <div className='flex justify-between items-center'>
                <span>
                    platform fee
                </span>

                    <span>
                    free
                </span>
                </div>


            </div>

            <Divider/>

            <div className='flex justify-between items-center p-5'>
                <span className='font-bold'>
                    total
                </span>

                <span>
                    $200
                </span>
            </div>
        </>
    );
};

export default PricingCard;
