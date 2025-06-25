import React, {useState} from 'react';
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import {Button} from "@mui/material";
import ResetPasswordForm from "./ResetPasswordForm";

const Auth = () => {

    const [mode, setMode] = useState<'login' | 'register' | 'reset'>('login');


    return (
        <div className='flex justify-center h-[90vh] items-center'>
            <div className='max-w-md h-[85vh] rounded-md border shadow-lg'>
                <img src='https://t4.ftcdn.net/jpg/02/30/72/41/360_F_230724124_ZWlHSZBIvqvdJQj9at15WaKRqAtCUKTu.jpg'
                     alt=''
                     className='w-full rounded-t-md'/>

                <div className='mt-8 px-10'>
                    {
                        mode === 'login' ? <LoginForm/>
                            : mode === 'reset' ? <ResetPasswordForm/>
                                : <RegisterForm switchToLogin = {() => setMode('login')}/>
                    }


                    <div className='flex items-center gap-1 mt-5 justify-center'>
                        {
                            mode === 'login'
                                ? <>
                                    <p>Chưa có tài khoản?</p>
                                    <Button size='small' onClick={() => setMode('register')}>Đăng ký</Button>
                                </>
                                : <>
                                    <p>Đã có tài khoản?</p>
                                    <Button size='small' onClick={() => setMode('login')}>Đăng nhập</Button>
                                </>
                        }
                    </div>

                    {
                        mode === 'login' &&
                            <div className='flex items-center gap-1 mt-5 justify-center'>
                                <p>Quên mật khẩu?</p>
                                <Button size='small' onClick={() => setMode('reset')}>
                                    Đặt lại mật khẩu
                                </Button>
                            </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default Auth;
