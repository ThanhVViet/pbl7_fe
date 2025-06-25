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
import {useEffect} from "react";
import {getSellerOrders, updateOrderStatus} from "../../../state/seller/sellerOrderSlice";
import {Button, Menu, MenuItem} from "@mui/material";
import LoadingWrapper from '../../../customer/components/LoadingWrapper';

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
    // hide last border
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


export default function OrderTable() {

    const dispatch = useAppDispatch()
    const {orders, loading} = useAppSelector(state => state.sellerOrder)


    const [anchorEl, setAnchorEl] = React.useState<null | any>({});
    const open = Boolean(anchorEl);
    const handleClick = (event: any, orderId: number) => {
        setAnchorEl((prev: any) => ({...prev, [orderId]: event.currentTarget}));
    };
    const handleClose = (orderId: number) => () => {
        setAnchorEl((prev: any) => ({...prev, [orderId]: null}));
    };

    const handleUpdateStatusOrder = (orderId: number, orderStatus: any) => () =>{
        dispatch(updateOrderStatus({jwt: localStorage.getItem('jwt') || '', orderId, orderStatus}))
    }

    useEffect(() => {
        setTimeout(() => {
            dispatch(getSellerOrders(localStorage.getItem('jwt') || ''))
        }, 2000)
    }, []);
    return (
        <LoadingWrapper loading={loading}>
            <div className="flex items-center justify-center min-h-[400px]">
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 700}} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Id</StyledTableCell>
                                <StyledTableCell>Product</StyledTableCell>
                                <StyledTableCell align="right">Shipping Address</StyledTableCell>
                                <StyledTableCell align="right">Status</StyledTableCell>
                                <StyledTableCell align="right">Update</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orders?.map((item) => (
                                <StyledTableRow key={item.id}>
                                    <StyledTableCell component="th" scope="row">
                                        {item.id}
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        <div>
                                            {
                                                item.items.map((orderItem, index) => <div
                                                    className='flex gap-5'
                                                    key={index}>
                                                    <img src={orderItem?.product?.images[0]} alt='' className='w-20 rounded-md'/>

                                                    <div className='flex flex-col justify-between py-2'>
                                                        <h1>Title: {orderItem?.product?.title}</h1>
                                                        <h1>Price: {orderItem?.product?.sellingPrice}</h1>
                                                        <h1>Color: {orderItem?.product?.color}</h1>
                                                    </div>
                                                </div>)
                                            }
                                        </div>
                                    </StyledTableCell>
                                    <StyledTableCell align="left">
                                        <div className='flex flex-col gap-y-2'>
                                            <h1>{item.shippingAddress?.name}</h1>
                                            <h1>{item.shippingAddress?.address}, {item.shippingAddress?.city}</h1>
                                            <h1><strong>Mobile:</strong>{item.shippingAddress?.mobile}</h1>
                                        </div>
                                    </StyledTableCell>
                                    <StyledTableCell align="right">
                    <span className='px-5 py-2 border rounded-full text-primary-color border-primary-color'>
                      {item.orderStatus}
                    </span>
                                    </StyledTableCell>
                                    <StyledTableCell align="right">
                                        <Button
                                            id="basic-button"
                                            aria-controls={open ? 'basic-menu' : undefined}
                                            aria-haspopup="true"
                                            aria-expanded={open ? 'true' : undefined}
                                            onClick={(e) => handleClick(e, item?.id)}
                                        >
                                            STATUS
                                        </Button>
                                        <Menu
                                            id={`status-menu ${item?.id}`}
                                            anchorEl={anchorEl[item?.id]}
                                            open={Boolean(anchorEl[item?.id])}
                                            onClose={handleClose(item?.id)}
                                            MenuListProps={{
                                                'aria-labelledby': `status-menu ${item?.id}`,
                                            }}
                                        >
                                            {
                                                orderStatus.map((status) =>
                                                    <MenuItem
                                                        key={status.label}
                                                        onClick={handleUpdateStatusOrder(item?.id, status.label)}
                                                    >
                                                        {status.label}
                                                    </MenuItem>
                                                )
                                            }

                                        </Menu>
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </LoadingWrapper>
    );
}
