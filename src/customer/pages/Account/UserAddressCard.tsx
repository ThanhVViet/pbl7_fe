import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface UserAddressCardProps {
    onEdit?: () => void;
    onDelete?: () => void;
    item: any;
}

const UserAddressCard = ({ onEdit, onDelete, item }: UserAddressCardProps) => {
    return (
        <div className='p-5 border rounded-md flex justify-between items-start relative'>
            <div className='space-y-3'>
                <h1>{item?.name}</h1>
                <p className='w-[320px]'>
                   {item?.address}
                </p>
                <p><strong>mobile: </strong>{item?.mobile}</p>
            </div>
            <div className='flex gap-1 absolute top-2 right-2'>
                <Tooltip title="Sửa địa chỉ">
                    <IconButton size="small" color="primary" onClick={onEdit}>
                        <EditIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Xoá địa chỉ">
                    <IconButton size="small" color="error" onClick={onDelete}>
                        <DeleteIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
            </div>
        </div>
    );
};

export default UserAddressCard;
