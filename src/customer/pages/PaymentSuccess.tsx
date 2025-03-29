import React, {useEffect} from 'react';
import {Button} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import {useAppDispatch} from "../../state/store";
import {paymentSuccess} from "../../state/customer/OrderSlice";

const PaymentSuccess = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const {orderId} = useParams()

    // useEffect(() => {
    //     dispatch(paymentSuccess({jwt: localStorage.getItem('jwt') || '', paymentId, paymentLinkId}))
    // }, [orderId]);

    return (
        <div className='min-h-[90vh] flex items-center justify-center'>
            <div className='bg-primary-color text-white p-8 w-[90%] lg:w-[25%] border rounded-md h-[40vh] flex flex-col
             gap-7 justify-center items-center'>
                <h1 className='text-3xl font-semibold'>Congratulations!</h1>
                <h1 className='text-2xl font-semibold'>order success!</h1>
                <div>
                    <Button color='secondary' variant='contained' onClick={() =>  navigate('/')}>shop more!</Button>
                </div>

            </div>
        </div>
    );
};

export default PaymentSuccess;
