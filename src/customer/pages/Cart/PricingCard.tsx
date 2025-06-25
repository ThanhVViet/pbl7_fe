import React from 'react';
import {Divider} from "@mui/material";
import {useAppSelector} from "../../../state/store";

const PricingCard = () => {

    const {cart} = useAppSelector(store => store.cart)
    return (
        <>
            <div className='space-y-3 p-5'>


                <div className='flex justify-between items-center'>
                <span>
                    giảm giá
                </span>

                    <span>
                    0đ
                </span>
                </div>

                <div className='flex justify-between items-center'>
                <span>
                    phí ship
                </span>

                    <span>
                    miễn phí
                </span>
                </div>

                <div className='flex justify-between items-center'>
                <span>
                    phí hệ tống
                </span>

                    <span>
                    miễn phí
                </span>
                </div>


            </div>

            <Divider/>

            <div className='flex justify-between items-center p-5'>
                <span className='font-bold'>
                    Tổng tiền
                </span>

                <span>
                                            {new Intl.NumberFormat('vi-VN', {
                                                style: 'currency',
                                                currency: 'VND'
                                            }).format(Number(cart?.totalSellingPrice))}

                </span>
            </div>
        </>
    );
};

export default PricingCard;
