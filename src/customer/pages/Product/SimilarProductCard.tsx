import React from 'react';


const SimilarProductCard = () => {
    return (
        <div>
            <div className='group px-4 relative'>
                <div
                    className='card'>

                    <img className='card-media object-top'
                         src='https://m.media-amazon.com/images/I/81rN7jSUgHS._AC_SY879_.jpg' alt=''
                    />


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

        </div>
    );
};

export default SimilarProductCard;
