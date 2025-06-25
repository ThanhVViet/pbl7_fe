import React, { useState } from 'react';

const ZoomImage = ({ src }:{src : any}) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Thumbnail Image */}
            <img
                src={src}
                alt="product"
                onClick={() => setIsOpen(true)}
                // className="w-40 cursor-pointer hover:scale-105 transition"
                className="w-full rounded-md"
            />

            {/* Fullscreen Overlay with Zoomed Image */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
                    onClick={() => setIsOpen(false)}
                >
                    <img
                        src={src}
                        alt="zoomed"
                        className="max-w-[90%] max-h-[90%] rounded-lg shadow-xl transition-all"
                    />
                </div>
            )}
        </>
    );
};

export default ZoomImage;
