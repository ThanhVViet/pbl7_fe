import React, {useEffect, useState} from 'react';
import {Box, Button, FormControlLabel, Modal, Radio, RadioGroup} from "@mui/material";
import AddressCard from "./AddressCard";
import AddressForm from "./AddressForm";
import PricingCard from "../Cart/PricingCard";
import {useAppDispatch, useAppSelector} from "../../../state/store";
import {createOrder, fetchUserAddress} from "../../../state/customer/OrderSlice";
import {useFormik} from "formik";
import {Address} from "../../../types/UserType";
import {payWithVNPAy} from "../../../state/customer/PaymentSlice";
import { toast } from 'sonner';
import { clearCart, resetCartState } from "../../../state/customer/CartSlice";
import { useNavigate } from "react-router-dom";


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const paymentGatewayList = [
    {
        value: "COD",
        image: "https://proship.vn/wp-content/uploads/2022/05/phi-cod-la-gi-phuong-thuc-hinh-thuc-thanh-toan-cod-la-gi-1.png",
        label: "cod"
    },
    {
        value: "VNPay",
        image: "https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-VNPAY-QR-1.png",
        label: "vnpay"
    }
];

const Checkout = () => {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [paymentGateway, setPaymentGateway] = useState('COD');
    const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
    const dispatch = useAppDispatch();
    const {addresses} = useAppSelector(state => state.order);
    const {auth} = useAppSelector(state => state);
    const navigate = useNavigate();

    const handlePaymentChange = (event: any) => {
        setPaymentGateway(event.target.value);
    }

    const handleAddressSelect = (address: any) => {
        setSelectedAddress(address);
    }

    const handleCheckout = async () => {
        if (selectedAddress) {
            const data = {
                addressId: selectedAddress.id,
                deliveryAddress: selectedAddress
            }
            if (paymentGateway === "VNPay") {
                try {
                    await dispatch(payWithVNPAy({
                        data: data,
                        paymentMethod: paymentGateway,
                        jwt: localStorage.getItem('jwt') || '',
                    })).unwrap();
                    await dispatch(clearCart(localStorage.getItem('jwt') || ''));
                    navigate("/account/orders");
                } catch (e) {
                    toast.error("Lỗi khi thanh toán VNPay!");
                }
            } else {
                try {
                    await dispatch(createOrder({
                        data: data,
                        jwt: localStorage.getItem('jwt') || '',
                    })).unwrap();
                    await dispatch(clearCart(localStorage.getItem('jwt') || ''));
                    navigate("/account/orders");
                } catch (e) {
                    toast.error("Lỗi khi tạo đơn hàng!");
                }
            }
        } else {
            toast.warning("Vui lòng chọn địa chỉ giao hàng!");
        }
    }

    useEffect(() => {
        dispatch(fetchUserAddress(auth.jwt || ''));
    }, [auth.jwt]);

    return (
        <>
            <div className='pt-10 px-5 sm:px-10 md:px-44 lg:px-60 min-h-screen'>
                <div className='space-y-5 lg:space-y-0 lg:grid grid-cols-3 lg:gap-9'>
                    <div className='col-span-2 space-y-5'>
                        <div className='flex justify-between items-center'>
                            <h1 className='font-semibold'>
                                Chọn địa chỉ giao hàng
                            </h1>

                        </div>

                        <div className='text-xs font-medium space-y-5'>
                            <div className='space-y-3'>
                                {
                                    addresses?.map((item, index) => (
                                        <AddressCard
                                            item={item}
                                            key={index}
                                            onSelect={handleAddressSelect}
                                            selected={selectedAddress?.id === item.id}

                                        />
                                    ))
                                }
                            </div>
                        </div>
                        
                    </div>

                    <div>
                        <div>
                            <div className='space-y-3 border p-5 rounded-md'>
                                <h1 className='text-primary-color font-medium pb-2 text-center'>
                                    Chọn phương thức thanh toán
                                </h1>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group"
                                    className='flex justify-between pr-0'
                                    onChange={handlePaymentChange}
                                    value={paymentGateway}
                                >
                                    {
                                        paymentGatewayList.map((item, index) => (
                                            <FormControlLabel
                                                key={index}
                                                className={`${item.value === paymentGateway ? "border-primary-color" : ""} border w-[45%] pr-2 rounded-md flex justify-center`}
                                                value={item.value}
                                                control={<Radio/>}
                                                label={
                                                    <img
                                                        className={`${item.value === "cod" ? "w-14" : ""} object-cover`}
                                                        src={item.image}
                                                        alt={item.label}
                                                    />
                                                }
                                            />
                                        ))
                                    }

                                </RadioGroup>
                            </div>
                        </div>
                        <div className='border rounded-md '>
                            <PricingCard/>
                            <div className='p-5'>
                                <Button fullWidth variant='contained' sx={{py: "11px"}} onClick={handleCheckout}>
                                    thanh toán
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    );
};

export default Checkout;
