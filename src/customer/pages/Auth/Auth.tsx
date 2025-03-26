import React, {useState} from 'react';
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import {Button} from "@mui/material";

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true)
    return (
        <div className='flex justify-center h-[90vh] items-center'>
            <div className='max-w-md h-[85vh] rounded-md border shadow-lg'>
                <img src='https://t4.ftcdn.net/jpg/02/30/72/41/360_F_230724124_ZWlHSZBIvqvdJQj9at15WaKRqAtCUKTu.jpg' alt=''
                     className='w-full rounded-t-md'/>

          <div className='mt-8 px-10'>
                    {
                    isLogin ? <LoginForm /> : <RegisterForm />
                }

                <div className='flex items-center gap-1 mt-5 justify-center'>
                    <p>{isLogin && "Dont't"} have account ?</p>
                    <Button size='small' onClick={() => setIsLogin(!isLogin)}>
                        {isLogin ? 'Create an account' : 'Login'}
                    </Button>
                </div>
          </div>
            </div>
        </div>
    );
};

export default Auth;
