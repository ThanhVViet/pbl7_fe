import React, {useState} from 'react';
import {useAppDispatch} from "../../../state/store";
import {useFormik} from "formik";
import {sellerLogin} from "../../../state/seller/sellerAuthSlice";
import {sendLoginSignupOtp, signup} from "../../../state/AuthSlice";
import {Button, TextField} from "@mui/material";
import * as Yup from 'yup';
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {toast} from "sonner";

const RegisterForm = ({switchToLogin} : {switchToLogin: any}) => {

    const dispatch = useAppDispatch()
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);


    const formik = useFormik({
        initialValues: {
            email: '',
            username: '',
            password: '',
            confirmPassword: ''

        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email').required('Required'),
            username: Yup.string().required('Required'),
            password: Yup.string().min(6, 'At least 6 characters').required('Required'),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('password') as unknown as string, ''], 'Passwords must match')
                .required('Required'),
        }),
        onSubmit: (values) => {
            const {email, username, password} = values;
            console.log('values', values);

            dispatch(signup({email, username, password}))
            toast.success('Vui long kiem tra email de xac thuc tai khoan !')
            switchToLogin()

            // values.otp = Number(values.otp)
            // dispatch(sellerLogin({email: values.email, otp: values.otp}))
            // dispatch(sellerLogin(values)

        }
    })


    const handleSendOtp = () => {
        dispatch(sendLoginSignupOtp({email: formik.values.email}))
    }

    return (
        <div>
            <h1 className='text-center font-bold text-xl text-primary-color pb-8'>ĐĂNG KÝ</h1>

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


                <div className='space-y-5'>
                    <TextField
                        fullWidth
                        name='username'
                        label='Tên người dùng'
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched?.username && Boolean(formik.errors?.username)}
                        helperText={formik.touched?.username && formik.errors?.username}
                    />

                    <div className='relative'>
                        <TextField
                            fullWidth
                            type={isPasswordVisible ? 'text' : 'password'}
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
                            className="w-[25px] cursor-pointer absolute right-[15px] top-[27px] transform -translate-y-1/2 hover:scale-110 transition-transform duration-300"
                            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                        >
                            {isPasswordVisible ? <RemoveRedEyeIcon className='text-red-600'/> : <VisibilityOffIcon/>}
                        </button>
                    </div>
                    <div className='relative'>
                        <TextField
                            type={isConfirmPasswordVisible ? 'text' : 'password'}
                            fullWidth
                            name='confirmPassword'
                            label='Nhập lại mật khẩu'
                            value={formik.values.confirmPassword}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched?.confirmPassword && Boolean(formik.errors?.confirmPassword)}
                            helperText={formik.touched?.confirmPassword && formik.errors?.confirmPassword}
                        />
                        <button
                            type='button'
                            className="w-[25px] cursor-pointer absolute right-[15px] top-[27px] transform -translate-y-1/2 hover:scale-110 transition-transform duration-300"
                            onClick={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
                        >
                            {isConfirmPasswordVisible ? <RemoveRedEyeIcon className='text-red-600'/> :
                                <VisibilityOffIcon/>}
                        </button>
                    </div>


                </div>


                {/*{*/}
                {/*    false && <Button fullWidth variant='contained' sx={{py: '11px'}} onClick={handleSendOtp}>*/}
                {/*        Send Otp*/}
                {/*    </Button>*/}
                {/*}*/}

                <Button onClick={() => formik.handleSubmit()} fullWidth variant='contained' sx={{py: '11px'}}>
                    TẠO TÀI KHOẢN
                </Button>
            </div>
        </div>
    );
};

export default RegisterForm;
