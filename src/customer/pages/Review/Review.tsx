import React from 'react';
import ReviewCard from "./ReviewCard";
import {Divider} from "@mui/material";

const Review = () => {
    return (
        <div className='p-5 lg:px-20 flex flex-col lg:flex-row gap-20'>
            <section className='w-full md:w-1/2 lg:w-[30%] space-y-2'>
                <img src='https://m.media-amazon.com/images/I/81rN7jSUgHS._AC_SY879_.jpg' alt=''/>

                <div>
                    <div>
                        <p className='text-xl font-bold'>v clothing</p>
                        <p className='text-lg text-gray-600'>men's green shirt</p>
                    </div>

                    <div>
                        <div className='price flex items-center gap-3 mt-5 text-2xl'>
                        <span className='font-semibold text-gray-800'>
                            $50
                        </span>
                            <span className='line-through text-gray-400'>$60</span>
                            <span className='text-primary-color font-semibold'>10%</span>
                        </div>
                    </div>
                </div>
            </section>

            <section className='space-y-5 w-full'>
                {
                    [1,1,1].map((item) => <div className='space-y-3'>
                        <ReviewCard />
                        <Divider />
                    </div>)
                }
            </section>
        </div>
    );
};

export default Review;
