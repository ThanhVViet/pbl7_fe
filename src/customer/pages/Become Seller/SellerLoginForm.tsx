import React from 'react';
import {TextField} from "@mui/material";
import {useFormik} from "formik";

const SellerLoginForm = () => {

    const formik = useFormik({
        initialValues: {
            email: '',
            otp: ''
        }, onSubmit: (values) => {
            console.log('values', values);
        }
    })
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
            </div>
        </div>
    );
};

export default SellerLoginForm;
