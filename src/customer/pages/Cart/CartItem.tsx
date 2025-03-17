import React from 'react';
import {Button, Divider, IconButton} from "@mui/material";
import {Close, Remove} from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";

const CartItem = () => {

    const handleUpdateQuantity = () => {

    }
    return (
        <div className='border rounded-md relative'>
            <div className='p-5 flex gap-3'>
                <div className=''>
                    <img className='w-[90px] rounded-md'
                         src='https://m.media-amazon.com/images/I/51IcM79RQJL._AC_SR38,50_.jpg' alt=''/>
                </div>
                <div className='space-y-2'>
                    <h1 className='font-semibold text-lg'>
                        V clothing
                    </h1>
                    <p className='text-gray-600 font-medium text-sm'>
                        ll
                    </p>
                    <p className='text-gray-400 text-xs'><strong>sold by</strong> lalala</p>
                    <p className='text-sm'>7 days replacement available</p>
                    <p className='text-sm text-gray-500'><strong>quantity : </strong> 7 </p>

                </div>


            </div>
            <Divider/>


            <div className='flex justify-between items-center'>
                <div className='px-5 py-2 flex justify-between items-center'>
                    <div className='flex items-center gap-2 w-[140px] justify-between'>
                        <Button disabled={true} onClick={handleUpdateQuantity}>
                            <Remove/>
                        </Button>
                        <span>
                                {5}
                            </span>
                        <Button onClick={handleUpdateQuantity}>
                            <AddIcon/>
                        </Button>
                    </div>
                </div>

                <div className='pr-5'>
                    <p className='text-gray-700 font-medium'>
                        $89
                    </p>
                </div>
            </div>

            <div className='absolute top-1 right-1'>
                    <IconButton color='primary'>
                        <Close />
                    </IconButton>
            </div>
        </div>
    );
};

export default CartItem;
