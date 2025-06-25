import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../../state/store";
import {useFormik} from "formik";
import {sellerLogin} from "../../../state/seller/sellerAuthSlice";
import {Button, CircularProgress, TextField} from "@mui/material";
import {sendLoginSignupOtp, signin} from "../../../state/AuthSlice";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {useNavigate} from "react-router-dom";

const LoginForm = () => {
    const dispatch = useAppDispatch()
    const {auth} = useAppSelector(store => store)
    const navigate = useNavigate()
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        }, onSubmit: (values) => {
            console.log('values', values);
            dispatch(signin({data: values, navigate: navigate}))

        }
    })


    const handleSendOtp = () => {
        dispatch(sendLoginSignupOtp({email: formik.values.email}))
    }


    return (
        <div>
            <h1 className='text-center font-bold text-xl text-primary-color pb-8'>ĐĂNG NHẬP</h1>

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

                {/*{*/}
                {/*    auth.otpSent &&*/}

                <div className='space-y-2 relative'>
                    <TextField
                        type={isPasswordVisible ? 'text' : 'password'}
                        fullWidth
                        name='password'
                        label='Mật khẩu'
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched?.password && Boolean(formik.errors?.password)}
                        helperText={formik.touched?.password && formik.errors?.password}
                    />

                    <button
                        type='button'
                        className="w-[25px] cursor-pointer absolute right-[15px] top-[19px] transform -translate-y-1/2 hover:scale-110 transition-transform duration-300"
                        onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                    >
                        {isPasswordVisible ? <RemoveRedEyeIcon className='text-red-600'/> : <VisibilityOffIcon/>}
                    </button>
                </div>


                <Button onClick={() => formik.handleSubmit()} fullWidth variant='contained' sx={{py: '11px'}}>
                    Đăng nhập
                </Button>
                {/*{*/}
                {/*    auth.otpSent ?*/}

                {/*        :*/}
                {/*        <Button fullWidth variant='contained' sx={{py: '11px'}} onClick={handleSendOtp}>*/}
                {/*            {*/}
                {/*                auth.loading ? <CircularProgress size={20}/> : 'Send OTP'*/}
                {/*            }*/}
                {/*        </Button>*/}
                {/*}*/}


            </div>
        </div>
    );
};

export default LoginForm;
