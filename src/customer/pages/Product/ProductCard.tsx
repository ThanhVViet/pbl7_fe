import React, {useEffect, useState} from 'react';
import "./ProductCard.css"
import {Button} from "@mui/material";
import {Favorite, ModeComment} from "@mui/icons-material";
import {teal} from "@mui/material/colors";

const images = [
    "https://m.media-amazon.com/images/I/81sH0QitrZL._AC_SY879_.jpg",
    "https://m.media-amazon.com/images/I/91Bgw4WP4dL._AC_SY879_.jpg",
    "https://m.media-amazon.com/images/I/91YRf8mHoML._AC_SY879_.jpg"
]
const ProductCard = () => {

    const [currentImage, setCurrentImage] = useState(0)
    const [isHover, setIsHover] = useState(false)

    useEffect(() => {
        let interval: any

        if (isHover) {
            interval = setInterval(() => {
                setCurrentImage((prevImage) => (prevImage + 1) % images.length)
            }, 1000)
        } else if (interval) {
            clearInterval(interval);
            interval = null
        }

        return () => clearInterval(interval)
    }, [isHover])

    return (
        <>
            <div className='group px-4 relative'>
                <div onMouseEnter={() => setIsHover(true)}
                     onMouseLeave={() => setIsHover(false)}
                     className='card'>
                    {
                        images.map((item, index) => <img className='card-media object-top' src={item} alt=''
                                                         style={{transform: `translateX(${(index - currentImage) * 100}%)`}}/>)
                    }

                    {
                        isHover && <div className='indicator flex flex-col items-center space-y-2'>
                            <div className='flex gap-3'>
                                <Button variant='contained' color='secondary'>
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
                            kosko
                        </h1>
                           <p>
                        grey shirt
                    </p>

                    </div>

                    <div className='price flex items-center gap-3'>
                        <span className='font-semibold text-gray-800'>
                            $50
                        </span>
                        <span className='thin-line-through text-gray-400'>$60</span>
                        <span className='text-primary-color font-semibold'>10%</span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductCard;
