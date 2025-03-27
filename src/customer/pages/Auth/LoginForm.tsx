import React from 'react';
import {useAppDispatch, useAppSelector} from "../../../state/store";
import {useFormik} from "formik";
import {sellerLogin} from "../../../state/seller/sellerAuthSlice";
import {Button, CircularProgress, TextField} from "@mui/material";
import {sendLoginSignupOtp, signin} from "../../../state/AuthSlice";

const LoginForm = () => {
    const dispatch = useAppDispatch()
    const {auth} = useAppSelector(store => store)

    const formik = useFormik({
        initialValues: {
            email: '',
            otp: ''
        }, onSubmit: (values) => {
            console.log('values', values);
            dispatch(signin(values))

        }
    })


    const handleSendOtp = () => {
        dispatch(sendLoginSignupOtp({email: formik.values.email}))
    }


    return (
        <div>
            <h1 className='text-center font-bold text-xl text-primary-color pb-8'>LOGIN</h1>

            <div className='space-y-5'>
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
                    auth.otpSent &&

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

                {
                    auth.otpSent ?
                        <Button onClick={() => formik.handleSubmit()} fullWidth variant='contained' sx={{py: '11px'}}>
                            Login
                        </Button>
                        :
                        <Button fullWidth variant='contained' sx={{py: '11px'}} onClick={handleSendOtp}>
                            {
                                auth.loading ? <CircularProgress size={20}/> : 'Send OTP'
                            }
                        </Button>
                }


            </div>
        </div>
    );
};

export default LoginForm;
