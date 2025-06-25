import React from 'react';
import {Avatar} from "@mui/material";
import {ElectricBolt} from "@mui/icons-material";
import {teal} from "@mui/material/colors";
import {Order} from "../../../types/OrderType";
import {useNavigate} from "react-router-dom";

const OrderItemCard = ({order}:{order: Order}) => {
    const navigate = useNavigate();
    const firstItem = order.items[0];
    return (
        <div onClick={() => navigate(`/account/order/${order.id}/${firstItem.id}`)} className='text-sm bg-white p-5 space-y-4 rounded-md cursor-pointer border'>
            <div className='flex items-center gap-5'>
                <div>
                    <Avatar sizes='small' sx={{bgcolor:teal[500]}}>
                        <ElectricBolt />
                    </Avatar>
                </div>
                <div>
                    <h1
                      className={`font-bold 
                        ${order.orderStatus === 'CANCELLED' ? 'text-red-500' : ''}
                        ${order.orderStatus === 'DELIVERED' ? 'text-green-600' : ''}
                        ${order.orderStatus !== 'CANCELLED' && order.orderStatus !== 'DELIVERED' ? 'text-primary-color' : ''}
                      `}
                    >
                      {order.orderStatus}
                    </h1>
                    <p>arriving by {order.deliveryDate}</p>
                </div>
            </div>
            <div className='p-5 bg-teal-50 flex gap-3 items-center'>
                <div className='w-[70px] h-[70px]'>
                    <img className='w-full h-full object-cover rounded-md' src={firstItem?.images[0]} alt='' />
                </div>
                <div className='w-full space-y-2'>
                    <p><strong>Tổng sản phẩm: </strong>{order.items.length}</p>
                    <p><strong>Tổng tiền: </strong>{order?.totalPrice?.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'})}</p>
                    <p><strong>Phí ship: </strong>free</p>
                </div>
            </div>
        </div>
    );
};

export default OrderItemCard;
