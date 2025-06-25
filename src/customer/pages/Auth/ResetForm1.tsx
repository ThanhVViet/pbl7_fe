import React, {useState} from 'react';
import {Button, CircularProgress, TextField} from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {useAppDispatch, useAppSelector} from "../../../state/store";
import {useNavigate} from "react-router-dom";
import {useFormik} from "formik";
import {sendLoginSignupOtp, signin} from "../../../state/AuthSlice";

const ResetForm1 = ({formik}: any) => {

    const dispatch = useAppDispatch()
    const {auth} = useAppSelector(store => store)


    const handleSendOtp = () => {
        dispatch(sendLoginSignupOtp({email: formik.values.email}))
    }

    return (
        <div>
            {/*<h1 className='text-center font-bold text-xl text-primary-color pb-8'>RESET</h1>*/}

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

                    <TextField

                        fullWidth
                        name='otp'
                        label='Mã OTP'
                        value={formik.values.otp}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched?.otp && Boolean(formik.errors?.otp)}
                        helperText={formik.touched?.otp && formik.errors?.otp}
                    />


                }


            </div>
        </div>
    );
};

export default ResetForm1;
