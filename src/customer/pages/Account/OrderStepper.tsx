import React, {useEffect, useState} from 'react';
import {Box, Typography, Fade} from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CancelIcon from '@mui/icons-material/Cancel';

const steps = [
    {
        name: 'Đã đặt hàng',
        description: 'Đơn hàng đã được tạo',
        value: "PLACED"
    },
    {
        name: 'Đã đóng gói',
        description: 'Sản phẩm đã được đóng gói',
        value: "CONFIRMED"
    },
    {
        name: 'Đã giao cho đơn vị vận chuyển',
        description: 'Đơn vị vận chuyển đã nhận hàng',
        value: "SHIPPED"
    },
    {
        name: 'Đang giao',
        description: 'Đơn hàng đang trên đường giao',
        value: "ARRIVING"
    },
    {
        name: 'Đã giao',
        description: 'Đơn hàng đã được giao thành công',
        value: "DELIVERED"
    }
]

const canceledStep = [
    {name: "Đã đặt hàng", description:"Đơn hàng đã được tạo" ,value: "PLACED"},
    {name: "Đã hủy", description:"Đơn hàng đã bị hủy" ,value: "CANCELLED"},
]

const OrderStepper = ({orderStatus}:any) => {
    const [statusStep, setStatusStep] = useState(steps)
    const currentStep = statusStep.findIndex(step => step.value === orderStatus)

    useEffect(() => {
        if(orderStatus === "CANCELLED"){
            setStatusStep(canceledStep)
        } else {
            setStatusStep(steps)
        }
    }, [orderStatus]);

    return (
        <Box className="flex flex-col gap-0 py-2 px-2" sx={{background: '#fff', borderRadius: 3, boxShadow: 2, p: 2}}>
            {statusStep.map((step, index) => {
                const isDone = index < currentStep && orderStatus !== "CANCELLED";
                const isCurrent = index === currentStep && orderStatus !== "CANCELLED";
                const isCancel = orderStatus === "CANCELLED" && step.value === "CANCELLED";
                return (
                    <Fade in={true} timeout={400 + index * 100} key={index}>
                        <Box className="flex items-start relative min-h-[70px]" sx={{mb: index < statusStep.length-1 ? 0.5 : 0}}>
                            <Box className="flex flex-col items-center mr-4">
                                <Box
                                    sx={{
                                        width: 36,
                                        height: 36,
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        boxShadow: isCurrent ? 4 : 1,
                                        background: isCancel
                                            ? '#f44336'
                                            : isDone
                                                ? 'linear-gradient(135deg,#009688 60%,#43e97b 100%)'
                                                : isCurrent
                                                    ? 'linear-gradient(135deg,#1976d2 60%,#4fc3f7 100%)'
                                                    : '#e0e0e0',
                                        color: isDone || isCurrent ? '#fff' : isCancel ? '#fff' : '#bdbdbd',
                                        fontSize: 22,
                                        transition: 'all 0.3s',
                                    }}
                                >
                                    {isCancel ? (
                                        <CancelIcon fontSize="medium" />
                                    ) : isDone || isCurrent ? (
                                        <CheckIcon fontSize="medium" />
                                    ) : (
                                        <RadioButtonUncheckedIcon fontSize="medium" />
                                    )}
                                </Box>
                                {/* Đường nối */}
                                {index < statusStep.length - 1 && (
                                    <Box sx={{
                                        width: 4,
                                        height: 40,
                                        background: isDone ? 'linear-gradient(180deg,#009688 60%,#43e97b 100%)' : '#e0e0e0',
                                        borderRadius: 2,
                                        marginTop: '2px',
                                        transition: 'background 0.3s',
                                    }} />
                                )}
                            </Box>
                            {/* Nội dung */}
                            <Box
                                className={`flex-1`}
                                sx={{
                                    borderRadius: 2,
                                    px: 1,
                                    py: isCurrent ? 1.5 : 1,
                                    boxShadow: 0,
                                    background: isCurrent ? '#e6fcf5' : 'transparent',
                                    transition: 'all 0.3s',
                                    minHeight: 36,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                }}
                            >
                                <Typography variant="subtitle1" fontWeight={isCurrent ? 700 : 500} color={isCurrent ? 'primary.main' : isDone ? 'success.main' : isCancel ? 'error' : 'text.primary'}>
                                    {step.name}
                                </Typography>
                                <Typography variant="body2" color={isCurrent ? 'primary.main' : isDone ? 'success.main' : isCancel ? 'error' : 'text.secondary'}>
                                    {step.description}
                                </Typography>
                            </Box>
                        </Box>
                    </Fade>
                );
            })}
        </Box>
    );
};

export default OrderStepper;
