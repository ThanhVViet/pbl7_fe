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
import {fetchSellerProducts} from "../../../state/seller/sellerProductSlice";
import {Product} from "../../../types/ProductType";
import {Button, IconButton} from "@mui/material";
import {Edit} from "@mui/icons-material";

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


export default function ProductTable() {

    const dispatch = useAppDispatch()
    const {sellerProduct} = useAppSelector(store => store)

    useEffect(() => {
        dispatch(fetchSellerProducts(localStorage.getItem('jwt')))
    }, []);

    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 700}} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Images</StyledTableCell>
                        <StyledTableCell>Title</StyledTableCell>
                        <StyledTableCell align="right">MRP</StyledTableCell>
                        <StyledTableCell align="right">Selling Price</StyledTableCell>
                        <StyledTableCell align="right">Color</StyledTableCell>
                        <StyledTableCell align="right">Update Stock</StyledTableCell>
                        <StyledTableCell align="right">Update</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sellerProduct.products.map((item: Product) => (
                        <StyledTableRow key={item?.id}>
                            <StyledTableCell component="th" scope="row">
                                <div className='flex gap-1 flex-wrap '>
                                    {
                                        item?.images.map((image, index) => <img
                                            className='w-20 rounded-md'
                                            key={index} src={image} alt=''/>)
                                    }
                                </div>
                            </StyledTableCell>
                            <StyledTableCell>{item?.title}</StyledTableCell>
                            <StyledTableCell align="right">{item?.mrpPrice}</StyledTableCell>
                            <StyledTableCell align="right">{item?.sellingPrice}</StyledTableCell>
                            <StyledTableCell align="right">{item?.color}</StyledTableCell>
                            <StyledTableCell align="right">
                                <Button size='small'>
                                    in stock
                                </Button>
                            </StyledTableCell>
                            <StyledTableCell align="right">
                                <IconButton color='primary' size='small'>
                                    <Edit/>
                                </IconButton>
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
