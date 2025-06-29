import React, {useEffect, useState} from 'react';
import "./ProductCard.css"
import {Button} from "@mui/material";
import {Favorite, ModeComment} from "@mui/icons-material";
import {teal} from "@mui/material/colors";
import {Product} from "../../../types/ProductType";
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../../state/store";
import {addProductToWishlist} from "../../../state/customer/WishlistSlice";


const ProductCard = ({item}: { item: Product }) => {

    const [currentImage, setCurrentImage] = useState(0)
    const [isHover, setIsHover] = useState(false)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    useEffect(() => {
        let interval: any

        if (isHover) {
            interval = setInterval(() => {
                setCurrentImage((prevImage) => (prevImage + 1) % item?.images.length)
            }, 1000)
        } else if (interval) {
            clearInterval(interval);
            interval = null
        }

        return () => clearInterval(interval)
    }, [isHover])

    const handleAddProductToWishlist = (e: any) => {
        e.stopPropagation()
        item.id && dispatch(addProductToWishlist({productId: item.id, jwt: localStorage.getItem('jwt') || ''}))
    }

    return (
        <>
            <div onClick={() => navigate(`/product-details/${item?.category?.categoryId}/${item.title}/${item.id}`)}
                 className='group px-4 relative'>
                <div onMouseEnter={() => setIsHover(true)}
                     onMouseLeave={() => setIsHover(false)}
                     className='card'>
                    {
                        item?.images.map((item, index) => <img key={index} className='card-media object-top' src={item}
                                                               alt=''
                                                               style={{transform: `translateX(${(index - currentImage) * 100}%)`}}/>)
                    }

                    {
                        isHover && <div className='indicator flex flex-col items-center space-y-2'>
                            <div className='flex gap-3'>
                                <Button onClick={(e) => handleAddProductToWishlist(e)} variant='contained'
                                        color='secondary'>
                                    <Favorite sx={{color: teal[500]}}/>
                                </Button>

                                <Button variant='contained' color='secondary'>
                                    <ModeComment sx={{color: teal[500]}}/>
                                </Button>
                            </div>
                        </div>
                    }
                </div>

                <div className='details pt-3 space-y-1 group-hover-effect rounded-md'>
                    <div className='name'>
                        <h1>
                            {item.seller?.businessDetails?.businessName}
                        </h1>
                        <p>
                            {item.title}
                        </p>

                    </div>

                    <div className='price flex items-center gap-3'>
                    <span className='font-semibold text-gray-800'>
                        {new Intl.NumberFormat('vi-VN', {style: 'currency', currency: 'VND'}).format(item.sellingPrice)}
                    </span>

                        {/*<span className='thin-line-through text-gray-400'>*/}
                        {/*    ${item.mrpPrice}*/}
                        {/*</span>*/}
                        {/*<span className='text-primary-color font-semibold'>{item.discountPercentage}%</span>*/}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductCard;
