import React from 'react';
import {Button, TextField} from "@mui/material";
import {useFormik} from "formik";
import {useAppDispatch} from "../../../state/store";
import {sendLoginSignupOtp, signin} from "../../../state/AuthSlice";
import {sellerLogin} from "../../../state/seller/sellerAuthSlice";

const SellerLoginForm = () => {

    const dispatch = useAppDispatch()

    const formik = useFormik({
        initialValues: {
            email: '',
            otp: ''
        }, onSubmit: (values) => {
            console.log('values', values);
            // values.otp = Number(values.otp)
            dispatch(sellerLogin({email: values.email, otp: values.otp}))
            // dispatch(sellerLogin(values)

        }
    })

    const handleSendOtp = () => {
        dispatch(sendLoginSignupOtp({email: formik.values.email}))
    }

    const handleLogin = () => {
    }
    return (
        <div>
            <div className='space-y-5'>
                <h1 className='font-bold text-center text-xl text-primary-color pb-5'> Login As Seller</h1>
                <TextField
                    fullWidth
                    name='email'
                    label='Email'
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched?.email && Boolean(formik.errors?.email)}
                    helperText={formik.touched?.email && formik.errors?.email}
                />

                {
                    true &&

                    <div className='space-y-2'>
                        <p className='font-medium text-sm opacity-60'>Enter OTP sent to your email.</p>
                        <TextField
                            fullWidth
                            name='otp'
                            label='otp'
                            value={formik.values.otp}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched?.otp && Boolean(formik.errors?.otp)}
                            helperText={formik.touched?.otp && formik.errors?.otp}
                        />
                    </div>

                }

                <Button fullWidth variant='contained' sx={{py: '11px'}} onClick={handleSendOtp}>
                    Send Otp
                </Button>

                <Button onClick={() => formik.handleSubmit()} fullWidth variant='contained' sx={{py: '11px'}}>
                    Login
                </Button>
            </div>
        </div>
    );
};

export default SellerLoginForm;
