import React from 'react';
import {Button, Divider, IconButton} from "@mui/material";
import {Close, Remove} from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import {CartItem} from "../../../types/CartType";
import {useAppDispatch} from "../../../state/store";
import {deleteCartItem, updateCartItem} from "../../../state/customer/CartSlice";

const CartItemCard = ({item}: { item: CartItem }) => {

    const dispatch = useAppDispatch()

    const handleUpdateQuantity = (value: number) => () => {
        if (value === -1 && item.quantity === 1) {
            handleRemoveCartItem()
        }
        const data = {
            cartItemId: item.id,
            quantity: item.quantity + value
        }
        dispatch(updateCartItem({
            jwt: localStorage.getItem('jwt') || '',
            data: data
        }))
    }

    const handleRemoveCartItem = () => {
        dispatch(deleteCartItem({cartItemId: item.id, jwt: localStorage.getItem('jwt') || ''}))
    }

    return (
        <div className='border rounded-md relative'>
            <div className='p-5 flex gap-3'>
                <div className='w-[90px] h-[90px] flex-shrink-0'>
                    <img className='w-full h-full object-cover rounded-md'
                         src={item?.images[0]} alt='Product'/>
                </div>

                <div className='space-y-2'>
                    {/*<h1 className='font-semibold text-lg'>*/}
                    {/*    {item?.product?.seller?.businessDetails?.businessName}*/}
                    {/*</h1>*/}
                    <p className='text-gray-600 font-medium text-sm'>
                        {item?.productName}
                    </p>
                    {/*<p className='text-gray-400 text-xs'><strong>sold by</strong> lalala</p>*/}
                    <p className='text-sm'>7 days replacement available</p>
                    <p className='text-sm text-gray-500'><strong>quantity : </strong> {item?.quantity} </p>

                </div>


            </div>
            <Divider/>


            <div className='flex justify-between items-center'>
                <div className='px-5 py-2 flex justify-between items-center'>
                    <div className='flex items-center gap-2 w-[140px] justify-between'>
                        <Button onClick={handleUpdateQuantity(-1)}>
                            <Remove/>
                        </Button>
                        <span>
                                {item.quantity}
                            </span>
                        <Button onClick={handleUpdateQuantity(1)}>
                            <AddIcon/>
                        </Button>
                    </div>
                </div>

                <div className='pr-5'>
                    <p className='text-gray-700 font-medium'>
                        {new Intl.NumberFormat('vi-VN', {style: 'currency', currency: 'VND'}).format(item?.productPrice)}

                    </p>
                </div>
            </div>

            <div className='absolute top-1 right-1'>
                <IconButton onClick={handleRemoveCartItem} color='primary'>
                    <Close/>
                </IconButton>
            </div>
        </div>
    );
};

export default CartItemCard;
