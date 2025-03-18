import React, {useState} from 'react';
import SellerAccountForm from "./SellerAccountForm";
import SellerLoginForm from "./SellerLoginForm";
import {Button} from "@mui/material";

const BecomeSeller = () => {

    const [isLogin, setIsLogin] = useState(false);

    const handleLogin = () => {
        setIsLogin(!isLogin);
    }
    return (
        <div className='grid md:gap-10 grid-cols-3 min-h-screen'>
            <section className='lg:col-span-1 md:col-span-2 col-span-3 p-10 shadow-lg rounded-b-md'>
                {
                    !isLogin ? <SellerAccountForm /> : <SellerLoginForm />
                }

                <div className='mt-10 space-y-2'>
                    <h1 className='text-center text-sm font-medium'>already have account ?</h1>

                    <Button fullWidth sx={{py:"11px"}} onClick={handleLogin} variant='outlined' color='primary'>
                        {isLogin ? 'register' : 'login'}
                    </Button>
                </div>

            </section>

            <section className='hidden md:col-span-1 lg:col-span-2 md:flex justify-center items-center'>
                <div className='lg:w-[70%] px-5 space-y-10'>
                    <div className='space-y-2 font-bold text-center'>
                        <p className='text-2xl'>join the club !!</p>
                        <p className='text-primary-color text-lg'>boost your sales today</p>
                    </div>
                    <img src='https://i.pinimg.com/736x/70/06/82/7006825ace821387ffd605c360a166cf.jpg' alt=''/>
                </div>

            </section>
        </div>
    );
};

export default BecomeSeller;
