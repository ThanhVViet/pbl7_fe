import React, {useEffect} from 'react';
import {Box, Button, Divider, Typography, Paper, Avatar, Dialog, DialogTitle, DialogContent, DialogActions} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import OrderStepper from "./OrderStepper";
import PaymentIcon from '@mui/icons-material/Payment';
import StorefrontIcon from '@mui/icons-material/Storefront';
import {useAppDispatch, useAppSelector} from "../../../state/store";
import {fetchAddressById, fetchOrderById, fetchOrderItemById, cancelOrder} from "../../../state/customer/OrderSlice";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { toast } from 'sonner';
import CancelIcon from '@mui/icons-material/Cancel';
import { CircularProgress } from '@mui/material';

const OrderDetails = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const {orderId, orderItemId} = useParams();
    const {orderItem, currentOrder, address} = useAppSelector(store => store.order);
    const [openCancel, setOpenCancel] = React.useState(false);
    const [loadingCancel, setLoadingCancel] = React.useState(false);

    useEffect(() => {
        dispatch(fetchOrderById({orderId: Number(orderId), jwt: localStorage.getItem('jwt') || ''}))
        dispatch(fetchOrderItemById({orderItemId: Number(orderItemId), jwt: localStorage.getItem('jwt') || ''}))
        if (currentOrder?.addressId) {
            dispatch(fetchAddressById({
                addressId: currentOrder?.addressId || 0,
                jwt: localStorage.getItem('jwt') || ''
            }))
        }
    }, []);

    const handleCancelOrder = async () => {
        setLoadingCancel(true);
        try {
            await dispatch(cancelOrder(currentOrder?.id)).unwrap();
            toast.success('Huỷ đơn hàng thành công!');
            setOpenCancel(false);
            await Promise.all([
                dispatch(fetchOrderById({orderId: Number(orderId), jwt: localStorage.getItem('jwt') || ''})),
                dispatch(fetchOrderItemById({orderItemId: Number(orderItemId), jwt: localStorage.getItem('jwt') || ''}))
            ]);
        } catch (e) {
            toast.error('Huỷ đơn hàng thất bại!');
        } finally {
            setLoadingCancel(false);
        }
    };

    // Hiển thị sản phẩm: nếu nhiều thì dùng slider
    const renderProduct = () => {
        if (!currentOrder?.items || currentOrder.items.length === 0) return null;
        if (currentOrder.items.length === 1) {
            const item = currentOrder.items[0];
            return (
                <Paper elevation={2} className="p-6 flex items-center gap-6 rounded-xl">
                    <Avatar
                        src={item.images?.[0]}
                        alt={item.productName}
                        variant="rounded"
                        sx={{ width: 90, height: 90, boxShadow: 2 }}
                    />
                    <div className="flex-1">
                        <Typography variant="h6" fontWeight={600} gutterBottom>
                            {item.productName}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Số lượng: {item.quantity}
                        </Typography>
                    </div>
                </Paper>
            );
        }

        return (
            <Box>
                <Swiper
                    navigation
                    modules={[Navigation]}
                    spaceBetween={24}
                    slidesPerView={1}
                    style={{paddingBottom: 16, borderRadius: 16}}
                >
                    {currentOrder.items.map((item, idx) => (
                        <SwiperSlide key={idx}>
                            <Paper elevation={2} className="p-6 flex items-center gap-6 rounded-xl">
                                <Avatar
                                    src={item.images?.[0]}
                                    alt={item.productName}
                                    variant="rounded"
                                    sx={{ width: 90, height: 90, boxShadow: 2 }}
                                />
                                <div className="flex-1">
                                    <Typography variant="h6" fontWeight={600} gutterBottom>
                                        {item.productName}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Số lượng: {item.quantity}
                                    </Typography>
                                </div>
                            </Paper>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Box>
        );
    };

    return (
        <Box className="max-w-3xl mx-auto py-8 space-y-6">
            {/* Sản phẩm */}
            {renderProduct()}

            {/* Trạng thái đơn hàng */}
            <Box className="mb-2">
                <Typography variant="subtitle1" fontWeight={600} gutterBottom color="primary">
                    Trạng thái đơn hàng
                </Typography>
                <OrderStepper orderStatus={currentOrder?.orderStatus}/>
            </Box>

            {/* Địa chỉ giao hàng */}
            <Paper elevation={2} className="p-6 rounded-xl">
                <Typography variant="subtitle1" fontWeight={600} gutterBottom color="primary">
                    Địa chỉ giao hàng
                </Typography>
                <div className="flex items-center gap-3 mb-2">
                    <StorefrontIcon color="action"/>
                    <Typography variant="body1" fontWeight={500}>{address?.address}</Typography>
                </div>
                <Typography variant="body2" color="text.secondary">
                    {address?.city}, {address?.state}, {address?.locality}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    SĐT: {address?.mobile}
                </Typography>
            </Paper>

            <Paper elevation={2} className="p-6 rounded-xl space-y-3">
                <div className="flex justify-between items-center">
                    <Typography variant="subtitle1" fontWeight={600} color="primary">
                        Tổng tiền
                    </Typography>
                    <Typography variant="h6" color="success.main" fontWeight={700}>
                        {currentOrder?.totalPrice?.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'})}
                    </Typography>
                </div>
                <Divider/>
                <div className="flex items-center gap-2 bg-teal-50 rounded px-3 py-2 w-fit">
                    <PaymentIcon color="primary"/>
                    <Typography variant="body2" fontWeight={500}>Thanh toán khi nhận hàng</Typography>
                </div>
                <Typography variant="caption" color="text.secondary">
                    Người bán: <b>thanh viet</b>
                </Typography>
                <Button 
                    fullWidth 
                    color="error" 
                    variant="outlined" 
                    sx={{py: '0.7rem', mt: 2}}
                    disabled={currentOrder?.orderStatus === 'CANCELLED' || currentOrder?.orderStatus === 'DELIVERED'}
                    onClick={() => setOpenCancel(true)}
                >
                    HUỶ ĐƠN HÀNG
                </Button>
            </Paper>

            {/* Dialog xác nhận huỷ đơn */}
            <Dialog 
                open={openCancel} 
                onClose={() => setOpenCancel(false)}
                TransitionProps={{
                    enter: true,
                    exit: true
                }}
                PaperProps={{
                    sx: {
                        borderRadius: 3,
                        p: 1,
                        maxWidth: '400px',
                        width: '90%'
                    }
                }}
            >
                <DialogTitle sx={{
                    textAlign: 'center',
                    pb: 1,
                    pt: 2,
                    color: 'error.main',
                    fontWeight: 600
                }}>
                    <CancelIcon sx={{ fontSize: 40, mb: 1 }} color="error" />
                    <Typography variant="h6" component="div">
                        Xác nhận huỷ đơn hàng
                    </Typography>
                </DialogTitle>
                <DialogContent sx={{ pb: 2, px: 3 }}>
                    <Typography 
                        align="center" 
                        color="text.secondary"
                        sx={{
                            bgcolor: 'error.lighter',
                            p: 2,
                            borderRadius: 2,
                            fontWeight: 500
                        }}
                    >
                        Bạn có chắc chắn muốn huỷ đơn hàng này không?
                        <br />
                        Hành động này không thể hoàn tác.
                    </Typography>
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 3, pt: 1, justifyContent: 'center', gap: 1 }}>
                    <Button 
                        onClick={() => setOpenCancel(false)} 
                        disabled={loadingCancel}
                        variant="outlined"
                        sx={{ 
                            minWidth: 100,
                            borderRadius: 2,
                            textTransform: 'none',
                            fontWeight: 600
                        }}
                    >
                        Đóng
                    </Button>
                    <Button 
                        onClick={handleCancelOrder} 
                        color="error" 
                        variant="contained" 
                        disabled={loadingCancel}
                        sx={{ 
                            minWidth: 100,
                            borderRadius: 2,
                            textTransform: 'none',
                            fontWeight: 600
                        }}
                        startIcon={loadingCancel ? <CircularProgress size={20} color="inherit" /> : <CancelIcon />}
                    >
                        {loadingCancel ? 'Đang huỷ...' : 'Huỷ đơn'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default OrderDetails;
