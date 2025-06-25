import React, { useEffect, useMemo, useState } from 'react';
import { Pagination, Stack } from '@mui/material';
import OrderItemCard from './OrderItemCard';
import { useAppDispatch, useAppSelector } from '../../../state/store';
import { fetchUserOrderHistory } from '../../../state/customer/OrderSlice';
import LoadingWrapper from '../../components/LoadingWrapper';

const itemsPerPage = 3;

const Order = () => {
    const dispatch = useAppDispatch();
    const { orders, loading } = useAppSelector(store => store.order);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        dispatch(fetchUserOrderHistory(localStorage.getItem('jwt') || ''));
    }, [dispatch]);

    const currentOrders = useMemo(() => {
        if (!orders) return [];
        const sorted = [...orders].sort(
            (a, b) =>
                new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        const indexOfLastOrder = currentPage * itemsPerPage;
        const indexOfFirstOrder = indexOfLastOrder - itemsPerPage;
        return sorted.slice(indexOfFirstOrder, indexOfLastOrder);
    }, [orders, currentPage]);

    const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
    };

    const renderSkeletonItem = () => (
        <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center gap-4 mb-4">
                <div className="w-8 h-8 rounded-full bg-gray-200"></div>
                <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-32"></div>
                </div>
            </div>
            <div className="flex gap-4">
                <div className="w-20 h-20 bg-gray-200 rounded"></div>
                <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                </div>
            </div>
        </div>
    );

    return (
        <div className='text-sm min-h-screen'>
            <div className='pb-5'>
                <h1 className='font-semibold text-lg'> Tất cả đơn hàng </h1>
                <p className='text-gray-600'> Gần đây nhất </p>
            </div>

            {loading ? (
                <div className="space-y-4">
                    {[...Array(3)].map((_, index) => (
                        <div key={index} className="animate-pulse">
                            {renderSkeletonItem()}
                        </div>
                    ))}
                </div>
            ) : (
                <>
                    {!orders || orders.length === 0 ? (
                        <div className='text-sm flex flex-col items-center justify-center py-10'>
                            <h1 className='font-semibold text-lg'>Không có đơn hàng </h1>
                            <p>Bạn chưa có đơn hàng nào cả.</p>
                        </div>
                    ) : (
                        <>
                            <div className='space-y-2'>
                                {currentOrders.map(order => (
                                    <OrderItemCard key={order.id} order={order} />
                                ))}
                            </div>

                            <Stack spacing={2} className='mt-5 flex items-center'>
                                <Pagination
                                    count={Math.ceil((orders?.length || 0) / itemsPerPage)}
                                    page={currentPage}
                                    onChange={handlePageChange}
                                    color='primary'
                                />
                            </Stack>
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default Order;
