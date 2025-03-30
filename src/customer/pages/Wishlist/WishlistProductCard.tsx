import React from 'react';
import {Product} from "../../../types/ProductType";
import {Close} from "@mui/icons-material";
import {addProductToWishlist} from "../../../state/customer/WishlistSlice";
import {useAppDispatch} from "../../../state/store";
import {teal} from "@mui/material/colors";

const WishlistProductCard = ({item}: { item: Product }) => {

    const dispatch = useAppDispatch()
    const handleRemoveProductToWishlist = () => {
        item.id && dispatch(addProductToWishlist({productId: item.id, jwt: localStorage.getItem('jwt') || ''}))
    }

    return (
        <div className='w-60 relative'>
            <div className='w-full'>
                <img src={item.images[0]} alt='' className='object-top w-full'/>
            </div>

            <div className='pt-3 space-y-1 rounded-md'>
                <p>{item.title}</p>
            </div>

            <div className='price flex items-center gap-3'>
                        <span className='font-semibold text-gray-800'>
                            ${item.sellingPrice}
                        </span>
                <span className='thin-line-through text-gray-400'>
                            ${item.mrpPrice}
                        </span>
                <span className='text-primary-color font-semibold'>{item.discountPercentage}%</span>
            </div>

            <div className='absolute top-1 right-1'>
                <button onClick={handleRemoveProductToWishlist}>
                    <Close className='cursor-pointer bg-white rounded-full p-1' sx={{color: teal[500], fontSize: '2rem'}}/>
                </button>
            </div>
        </div>
    );
};

export default WishlistProductCard;
