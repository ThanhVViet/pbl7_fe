// import React from 'react';
// import {Radio} from "@mui/material";
// import {Address} from "../../../types/UserType";
//
// const AddressCard = ({item}: {item: Address}) => {
//
//     const handleChange =(event:any)=>{
//
//     }
//     return (
//         <div className='p-5 border rounded-md flex'>
//             <div className=''>
//                 <Radio checked={true} onChange={handleChange} value='' name='radio-button'/>
//             </div>
//
//             <div className='space-y-3'>
//                 <h1>
//                     {item.name}
//                 </h1>
//                 <p className='w-[320px]'>
//                     {item.address}
//                 </p>
//                 <p><strong>Mobile:{''}</strong>{item.mobile}</p>
//             </div>
//         </div>
//     );
// };
//
// export default AddressCard;


import React from 'react';
import { Radio } from "@mui/material";
import { Address } from "../../../types/UserType";

interface AddressCardProps {
    item: Address;
    onSelect: (address: Address) => void;
    selected: boolean;
}

const AddressCard = ({ item, onSelect, selected }: AddressCardProps) => {

    const handleChange = () => {
        onSelect(item);
    };

    return (
        <div
            className={`p-5 border rounded-md flex items-start gap-4 cursor-pointer ${selected ? 'border-blue-500 bg-blue-50' : 'border-gray-300'} hover:border-primary-color`}
            onClick={handleChange}
        >
            <Radio
                checked={selected}
                onChange={handleChange}
                value={item.id}
                name='address-selection'
            />

            <div>
                <h1 className="font-semibold">{item.name}</h1>
                <p className='w-[320px]'>{item.address}</p>
                <p><strong>Mobile: </strong>{item.mobile}</p>
            </div>
        </div>
    );
};

export default AddressCard;

