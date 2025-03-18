import React from 'react';
import {Avatar} from "@mui/material";
import {ElectricBolt} from "@mui/icons-material";
import {teal} from "@mui/material/colors";

const OrderItem = () => {
    return (
        <div className='text-sm bg-white p-5 space-y-4 rounded-md cursor-pointer border'>
            <div className='flex items-center gap-5'>
                <div>
                    <Avatar sizes='small' sx={{bgcolor:teal[500]}}>
                        <ElectricBolt />
                    </Avatar>
                </div>

                <div>
                    <h1 className='font-bold text-primary-color'>pending</h1>
                    <p>arriving by fri,18 Jul</p>
                </div>
            </div>

            <div className='p-5 bg-teal-50 flex gap-3'>
               <div>
                    <img className='w-[70px] ' src='https://m.media-amazon.com/images/I/71rJtghEonS._AC_SY879_.jpg' alt=''/>
               </div>
                <div className='w-full space-y-2'>
                    <h1 className='font-bold'>v clothing</h1>
                    <p>description</p>
                    <p><strong>size: </strong>
                        free
                    </p>
                </div>
            </div>
        </div>
    );
};

export default OrderItem;
