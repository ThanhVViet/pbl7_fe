import React, { useEffect } from 'react';
import { Button, Typography, Box, Container } from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../../state/store";
import { paymentSuccess } from "../../state/customer/OrderSlice";
import { CheckCircle, ShoppingBag, Home } from '@mui/icons-material';
import { motion } from 'framer-motion';

const PaymentSuccess = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const location = useLocation();
    const { orderId } = useParams();

    const getQueryParam = (key: string) => {
        const query = new URLSearchParams(location.search);
        return query.get(key);
    };

    useEffect(() => {
        const paymentId = getQueryParam('paymentId');
        const paymentLinkId = getQueryParam('paymentLinkId');
        dispatch(paymentSuccess({
            jwt: localStorage.getItem('jwt') || '',
            paymentId: paymentId || '',
            paymentLinkId: paymentLinkId || ''
        }));
    }, [orderId]);

    return (
        <div className="min-h-screen py-20">
            <Container maxWidth="sm" sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="w-full"
                >
                    <Box
                        sx={{
                            bgcolor: 'white',
                            borderRadius: 4,
                            boxShadow: '0 4px 24px rgba(0, 150, 136, 0.15)',
                            p: 4,
                            textAlign: 'center',
                            mb: 4
                        }}
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                        >
                            <CheckCircle
                                sx={{
                                    fontSize: 80,
                                    color: '#009688',
                                    mb: 2
                                }}
                            />
                        </motion.div>

                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                        >
                            <Typography variant="h4" component="h1" gutterBottom sx={{ color: '#009688', fontWeight: 600 }}>
                                Thanh toán thành công!
                            </Typography>
                        </motion.div>

                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.6 }}
                        >
                            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                                Cảm ơn bạn đã mua hàng. Đơn hàng của bạn đã được xác nhận và đang được xử lý.
                            </Typography>
                        </motion.div>

                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.8 }}
                            className="flex flex-col sm:flex-row gap-3 justify-center"
                        >
                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<ShoppingBag />}
                                onClick={() => navigate('/products')}
                                sx={{
                                    bgcolor: '#009688',
                                    '&:hover': {
                                        bgcolor: '#00796b'
                                    },
                                    px: 3,
                                    py: 1
                                }}
                            >
                                Tiếp tục mua sắm
                            </Button>

                            <Button
                                variant="outlined"
                                color="primary"
                                startIcon={<Home />}
                                onClick={() => navigate('/')}
                                sx={{
                                    borderColor: '#009688',
                                    color: '#009688',
                                    '&:hover': {
                                        borderColor: '#00796b',
                                        bgcolor: 'rgba(0, 150, 136, 0.08)'
                                    },
                                    px: 3,
                                    py: 1
                                }}
                            >
                                Về trang chủ
                            </Button>
                        </motion.div>

                        {orderId && (
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 1 }}
                            >
                                <Typography variant="body2" color="text.secondary" sx={{ mt: 3 }}>
                                    Mã đơn hàng: <span className="font-medium">{orderId}</span>
                                </Typography>
                            </motion.div>
                        )}
                    </Box>
                </motion.div>
            </Container>
        </div>
    );
};

export default PaymentSuccess;
