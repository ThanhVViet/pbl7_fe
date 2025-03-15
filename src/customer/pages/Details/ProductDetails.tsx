import React, {useState} from 'react';
import StarIcon from '@mui/icons-material/Star';
import {teal} from "@mui/material/colors";
import {Button, Divider} from "@mui/material";
import {
    AddShoppingCart,
    Favorite,
    FavoriteBorder,
    LocalShipping,
    Remove,
    Shield,
    Wallet,
    WorkspacePremium
} from "@mui/icons-material";
import AddIcon from '@mui/icons-material/Add';

const ProductDetails = () => {

    const [quantity, setQuantity] = useState(1)

    return (
        <div className='px-5 lg:px-20 pt-10'>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-10'>
                <section className='flex flex-col lg:flex-row gap-5'>
                    <div className='w-full lg:w-[15%] flex flex-wrap lg:flex-col gap-3'>
                        {
                            [1, 1, 1].map((item) =>
                                <img className='lg:w-full w-[50px] cursor-pointer rounded-md'
                                     src='https://m.media-amazon.com/images/I/817w70GDTLL._AC_SY879_.jpg' alt=''/>
                            )
                        }

                    </div>

                    <div className='w-full lg:w-[85%]'>
                        <img className='w-full rounded-md'
                             src='https://m.media-amazon.com/images/I/81Y6r7df7OL._AC_SY879_.jpg' alt=''/>
                    </div>

                </section>

                <section>
                    <h1 className='font-bold text-lg text-primary-color'>V Fashion</h1>
                    <p className='text-gray-500 font-semibold'>green t shirt</p>
                    <div className='flex justify-between items-center py-2 border w-[180px] px-3 mt-5'>
                        <div className='flex gap-1 items-center'>
                            <span>
                                4
                            </span>
                            <StarIcon sx={{color: teal[500], fontSize: "17px"}}/>
                        </div>
                        <Divider orientation='vertical' flexItem/>
                        <span>234 Ratings</span>

                    </div>
                    <div>
                        <div className='price flex items-center gap-3 mt-5 text-2xl'>
                        <span className='font-semibold text-gray-800'>
                            $50
                        </span>
                            <span className='line-through text-gray-400'>$60</span>
                            <span className='text-primary-color font-semibold'>10%</span>
                        </div>
                        <p className='text-sm mt-1'>Inclusive of all taxes. Free shipping above $200.</p>
                    </div>
                    <div className='mt-7 space-y-3'>
                        <div className='flex items-center gap-4'>
                            <Shield sx={{color: teal[500]}}/>
                            <p>Authentic & Quality Assured</p>
                        </div>
                    </div>
                    <div className='mt-7 space-y-3'>
                        <div className='flex items-center gap-4'>
                            <WorkspacePremium sx={{color: teal[500]}}/>
                            <p>100% money back guarantee</p>
                        </div>
                    </div>

                    <div className='mt-7 space-y-3'>
                        <div className='flex items-center gap-4'>
                            <LocalShipping sx={{color: teal[500]}}/>
                            <p>Free shipping & Return</p>
                        </div>
                    </div>

                    <div className='mt-7 space-y-3'>
                        <div className='flex items-center gap-4'>
                            <Wallet sx={{color: teal[500]}}/>
                            <p>Pay on delivery</p>
                        </div>
                    </div>

                    <div className='mt-7 space-y-2'>
                        <h1>
                            QUANTITY
                        </h1>
                        <div className='flex items-center gap-2 w-[140px] justify-between'>
                            <Button variant='outlined' disabled={quantity === 1}  onClick={() => setQuantity(quantity - 1)}>
                                <Remove/>
                            </Button>
                            <span>
                                {quantity}
                            </span>
                               <Button variant='outlined' onClick={() => setQuantity(quantity + 1)}>
                                <AddIcon/>
                            </Button>
                        </div>
                    </div>

                    <div className='mt-12 flex items-center gap-5'>
                        <Button fullWidth variant='contained' className='' sx={{py:"1rem"}} startIcon={<AddShoppingCart/>}>
                            Add to bag
                        </Button>

                            <Button fullWidth variant='outlined' className='' sx={{py:"1rem"}} startIcon={<FavoriteBorder/>}>
                            Add to wishlist
                        </Button>
                    </div>

                    <div className='mt-5'>
                        <p>
                            description
                        </p>
                    </div>
                </section>



            </div>
        </div>
    );
};

export default ProductDetails;
