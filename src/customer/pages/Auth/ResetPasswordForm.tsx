import React, {useEffect, useState} from 'react';
import {Button, Step, StepLabel, Stepper} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../../state/store";
import {useFormik} from "formik";
import {reset, sendLoginSignupOtp} from "../../../state/AuthSlice";

import ResetForm1 from "./ResetForm1";
import ResetForm2 from "./ResetForm2";
import {toast} from "sonner";
import * as Yup from "yup";

const steps = [
    "Nhập mã OTP",
    "Nhập mật khẩu mới",
]

const ResetPasswordForm = () => {
    const [activeStep, setActiveStep] = useState(0)
    const dispatch = useAppDispatch()
    const { auth } = useAppSelector(state => state)

    const formik = useFormik({
        initialValues: {
            email: '',
            newPassword: '',
            confirmNewPassword: '',
            otp: ''
        },
          validationSchema: Yup.object({
            newPassword: Yup.string().min(6, 'At least 6 characters').required('Required'),
            confirmNewPassword: Yup.string()
                .oneOf([Yup.ref('newPassword') as unknown as string, ''], 'Passwords must match')
                .required('Required'),
        }),
        onSubmit: (values) => {
            console.log('values', values);
            const { email, newPassword, otp } = values;
            dispatch(reset({ email, newPassword, otp }))
            toast.success('Thay đổi mật khẩu thành công !')
            setTimeout(() => {
                window.location.href = '/login'
            }, 2000)
        }
    });

    const handleStep = () => {
        if (activeStep === 0) {
            if (!auth.otpSent) {
                dispatch(sendLoginSignupOtp({ email: formik.values.email }));
            } else if (formik.values.otp.length === 6) {
                (auth.otp === formik.values.otp && formik.values.otp) ? setActiveStep(1) : toast.error("Invalid OTP");
            } else {
                toast.error("Invalid OTP");
                console.log('Invalid OTP', auth);
            }
        } else if (activeStep === 1) {
            formik.handleSubmit();
        }
    }

    useEffect(() => {
        console.log('auth data', auth)
    }, []);
    return (
        <div>
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label, index) => (
                    <Step key={index}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>

            <section className='mt-10 space-y-10'>
                <div>
                    {activeStep === 0 ? <ResetForm1 formik={formik}/> : <ResetForm2 formik={formik}/>}
                </div>

                <div className='flex items-center justify-between'>
                    <Button onClick={() => setActiveStep(activeStep - 1)} variant='contained' disabled={activeStep === 0}>
                        Trở lại
                    </Button>

                    <Button onClick={handleStep} variant='contained'>
                        {activeStep === steps.length - 1 ? "Xác nhận" : auth.otpSent ? "Xác minh OTP" : "Gửi OTP"}
                    </Button>
                </div>
            </section>
        </div>
    );
};


export default ResetPasswordForm;
