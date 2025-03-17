import React from 'react';
import {Radio} from "@mui/material";

const AddressCard = () => {

    const handleChange =(event:any)=>{

    }
    return (
        <div className='p-5 border rounded-md flex'>
            <div className=''>
                <Radio checked={true} onChange={handleChange} value='' name='radio-button'/>
            </div>

            <div className='space-y-3'>
                <h1>
                    v
                </h1>
                <p className='w-[320px]'>
                    oke lalala
                </p>
                <p><strong>Mobile:</strong>945893075239</p>
            </div>
        </div>
    );
};

export default AddressCard;
