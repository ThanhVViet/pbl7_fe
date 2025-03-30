import React, {useEffect} from 'react';
import WishlistProductCard from "./WishlistProductCard";
import {useAppDispatch, useAppSelector} from "../../../state/store";
import {getWishlistByUserId} from "../../../state/customer/WishlistSlice";

const Wishlist = () => {

    const dispatch = useAppDispatch()
    const {wishlist} = useAppSelector(state => state.wishlist)

    useEffect(() => {
        dispatch(getWishlistByUserId({jwt: localStorage.getItem('jwt') || ''}))
    }, []);

    return (
        <div className='h-[85vh] p-5 lg:p-20 '>
            <section>
                <h1><strong>My Wishlist</strong> 5 items</h1>

                <div className='pt-10 flex flex-wrap gap-5'>
                    {
                        wishlist?.products?.map((item, index) => <WishlistProductCard key={index} item={item}  />)
                    }
                </div>
            </section>

        </div>
    );
};

export default Wishlist;
