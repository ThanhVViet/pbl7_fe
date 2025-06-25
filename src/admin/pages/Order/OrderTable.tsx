import * as React from 'react';
import {styled} from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useAppDispatch, useAppSelector} from "../../../state/store";
import {useEffect, useMemo, useState} from "react";
import {getSellerOrders, updateOrderStatus} from "../../../state/seller/sellerOrderSlice";
import {Button, Menu, MenuItem, Pagination, Stack} from "@mui/material";
import {fetchAllAddress} from "../../../state/customer/OrderSlice";
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import Select from '@mui/material/Select';

const StyledTableCell = styled(TableCell)(({theme}) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({theme}) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const orderStatusColor = {
    PENDING: {color: '#FFA500', label: 'PENDING'},
    CONFIRMED: {color: '#F5BCBA', label: 'CONFIRMED'},
    PLACED: {color: '#F5BCBA', label: 'PLACED'},
    SHIPPED: {color: '#1E90FF', label: 'SHIPPED'},
    DELIVERED: {color: '#32CD32', label: 'DELIVERED'},
    CANCELLED: {color: '#FF0000', label: 'CANCELLED'},
}

const orderStatus = [
    {color: '#FFA500', label: 'PENDING'},
    {color: '#F5BCBA', label: 'CONFIRMED'},
    {color: '#F5BCBA', label: 'PLACED'},
    {color: '#1E90FF', label: 'SHIPPED'},
    {color: '#32CD32', label: 'DELIVERED'},
    {color: '#FF0000', label: 'CANCELLED'},
]

const itemsPerPage = 5;

// Motion variants for animations
const tableVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
        opacity: 1, 
        y: 0,
        transition: {
            duration: 0.6,
            when: "beforeChildren",
            staggerChildren: 0.1
        }
    }
};

const rowVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            type: "spring" as "spring",
            stiffness: 100,
            damping: 15
        }
    },
    hover: {
        scale: 1.01,
        backgroundColor: "rgba(0, 150, 136, 0.04)",
        transition: { duration: 0.2 }
    }
};

const MotionTableRow = motion(StyledTableRow);

export default function OrderTable() {
    const dispatch = useAppDispatch();
    const {orders} = useAppSelector(state => state.sellerOrder);
    const {addresses} = useAppSelector(state => state.order);

    const [anchorEl, setAnchorEl] = React.useState<null | any>({});
    const open = Boolean(anchorEl);

    // Thêm state cho filter
    const [statusFilter, setStatusFilter] = useState('ALL');

    const handleStatusFilterChange = (event: any) => {
        setStatusFilter(event.target.value);
        setCurrentPage(1);
    };

    const handleClick = (event: any, orderId: number) => {
        setAnchorEl((prev: any) => ({...prev, [orderId]: event.currentTarget}));
    };
    
    const handleClose = (orderId: number) => () => {
        setAnchorEl((prev: any) => ({...prev, [orderId]: null}));
    };

    const handleUpdateStatusOrder = (orderId: number, orderStatus: any) => async () => {
        try {
            await dispatch(updateOrderStatus({jwt: localStorage.getItem('jwt') || '', orderId, orderStatus})).unwrap();
            toast.success('Cập nhật trạng thái đơn hàng thành công!');
        } catch (error) {
            toast.error('Cập nhật trạng thái đơn hàng thất bại!');
        }
    };

    const [currentPage, setCurrentPage] = useState(1);

    const currentOrders = useMemo(() => {
        if (!orders) return [];
        let filtered = [...orders];
        if (statusFilter !== 'ALL') {
            filtered = filtered.filter(order => order.orderStatus === statusFilter);
        }
        const sorted = filtered.sort(
            (a, b) =>
                new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        const indexOfLastOrder = currentPage * itemsPerPage;
        const indexOfFirstOrder = indexOfLastOrder - itemsPerPage;
        return sorted.slice(indexOfFirstOrder, indexOfLastOrder);
    }, [orders, currentPage, statusFilter]);

    const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
    };

    useEffect(() => {
        dispatch(getSellerOrders(localStorage.getItem('jwt') || ''));
        dispatch(fetchAllAddress(localStorage.getItem('jwt') || ''));
    }, []);

    return (
        <AnimatePresence>
            <motion.div
                variants={tableVariants}
                initial="hidden"
                animate="visible"
                className="overflow-hidden"
            >
                {/* Dropdown filter */}
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-semibold">Danh sách đơn hàng</h2>
                    <Select
                        value={statusFilter}
                        onChange={handleStatusFilterChange}
                        size="small"
                        sx={{ minWidth: 180 }}
                    >
                        <MenuItem value="ALL">Tất cả trạng thái</MenuItem>
                        {orderStatus.map((status) => (
                            <MenuItem key={status.label} value={status.label}>{status.label}</MenuItem>
                        ))}
                    </Select>
                </div>
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 700}} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>STT</StyledTableCell>
                                <StyledTableCell>Sản phẩm</StyledTableCell>
                                <StyledTableCell>Địa chỉ giao hàng</StyledTableCell>
                                <StyledTableCell align="right">Trạng thái</StyledTableCell>
                                <StyledTableCell align="right">Cập nhật</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <AnimatePresence>
                                {currentOrders?.map((item, index) => (
                                    <MotionTableRow
                                        key={item.id}
                                        variants={rowVariants}
                                        initial="hidden"
                                        animate="visible"
                                        whileHover="hover"
                                        exit={{ opacity: 0, x: -20 }}
                                    >
                                        <StyledTableCell component="th" scope="row">
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: index * 0.1 }}
                                            >
                                                {index + 1}
                                            </motion.div>
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: index * 0.1 }}
                                            >
                                                <div>
                                                    {item.items.map((orderItem, idx) => (
                                                        <motion.div
                                                            className='flex gap-5'
                                                            key={idx}
                                                            initial={{ opacity: 0, y: 20 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            transition={{ delay: index * 0.1 + idx * 0.05 }}
                                                        >
                                                            <motion.img 
                                                                src={orderItem?.images[0]} 
                                                                alt='' 
                                                                className='w-20 rounded-md'
                                                                whileHover={{ scale: 1.1 }}
                                                                transition={{ type: "spring", stiffness: 300 }}
                                                            />
                                                            <div className='flex flex-col justify-between py-2'>
                                                                <motion.h1 whileHover={{ color: "#009688" }}>
                                                                    Title: {orderItem?.productName}
                                                                </motion.h1>
                                                                <h1>Price: {orderItem?.productPrice}</h1>
                                                                <h1>Color: {orderItem?.product?.color}</h1>
                                                            </div>
                                                        </motion.div>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        </StyledTableCell>
                                        <StyledTableCell align="left">
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: index * 0.1 }}
                                            >
                                                {(() => {
                                                    const matchedAddress = addresses?.find(addr => addr.id === item.addressId)
                                                    return matchedAddress ? (
                                                        <motion.div 
                                                            className='flex flex-col gap-y-2'
                                                            whileHover={{ x: 5 }}
                                                        >
                                                            <h1>{matchedAddress.name}</h1>
                                                            <h1>{matchedAddress.address}, {matchedAddress.city}</h1>
                                                            <h1><strong>Mobile:</strong> {matchedAddress.mobile}</h1>
                                                        </motion.div>
                                                    ) : (
                                                        <h1>Address not found</h1>
                                                    );
                                                })()}
                                            </motion.div>
                                        </StyledTableCell>
                                        <StyledTableCell align="right">
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: index * 0.1 }}
                                            >
                                                {(() => {
                                                    const status = item.orderStatus;
                                                    const style = orderStatusColor[status] || {};
                                                    return (
                                                        <motion.span
                                                            className='px-5 py-2 border rounded-full'
                                                            style={{
                                                                color: style.color,
                                                                borderColor: style.color,
                                                            }}
                                                            whileHover={{ scale: 1.05 }}
                                                            whileTap={{ scale: 0.95 }}
                                                        >
                                                            {status}
                                                        </motion.span>
                                                    );
                                                })()}
                                            </motion.div>
                                        </StyledTableCell>
                                        <StyledTableCell align="right">
                                            <motion.div
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                <Button
                                                    id="basic-button"
                                                    aria-controls={open ? 'basic-menu' : undefined}
                                                    aria-haspopup="true"
                                                    aria-expanded={open ? 'true' : undefined}
                                                    onClick={(e) => handleClick(e, item?.id)}
                                                    disabled={item.orderStatus === 'DELIVERED' || item.orderStatus === 'CANCELLED'}
                                                >
                                                    UPDATE STATUS
                                                </Button>
                                            </motion.div>
                                            <Menu
                                                id={`status-menu ${item?.id}`}
                                                anchorEl={anchorEl[item?.id]}
                                                open={Boolean(anchorEl[item?.id])}
                                                onClose={handleClose(item?.id)}
                                                MenuListProps={{
                                                    'aria-labelledby': `status-menu ${item?.id}`,
                                                }}
                                            >
                                                {orderStatus.map((status) => (
                                                    <MenuItem
                                                        key={status.label}
                                                        onClick={handleUpdateStatusOrder(item?.id, status.label)}
                                                    >
                                                        {status.label}
                                                    </MenuItem>
                                                ))}
                                            </Menu>
                                        </StyledTableCell>
                                    </MotionTableRow>
                                ))}
                            </AnimatePresence>
                        </TableBody>
                    </Table>
                </TableContainer>
                {orders && orders.length > itemsPerPage && (
                    <motion.div 
                        className="flex justify-center mt-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <Pagination
                            count={Math.ceil(orders.length / itemsPerPage)}
                            page={currentPage}
                            onChange={handlePageChange}
                            color="primary"
                        />
                    </motion.div>
                )}
            </motion.div>
        </AnimatePresence>
    );
}
