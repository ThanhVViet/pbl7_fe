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
import {useEffect, useState} from "react";
import {allProducts} from "../../../state/admin/ProductSlice";
import {Product} from "../../../types/ProductType";
import {Button, FormControl, IconButton, InputLabel, MenuItem, Select} from "@mui/material";
import {Edit} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";
import {homeCategories} from "../../../data/homeCategories";
import { motion, AnimatePresence } from 'framer-motion';
import { getAllInventory } from '../../../state/admin/InventorySlice';

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
        backgroundColor: "rgba(0, 150, 136, 0.04)",
        transition: { duration: 0.2 }
    }
};

const MotionTableRow = motion(StyledTableRow);

export default function ProductTable({selectedCategory}: any) {
    const dispatch = useAppDispatch();
    const {adminProduct} = useAppSelector(store => store);
    const inventory = useAppSelector(store => store.inventory.inventory);
    const navigate = useNavigate();
    const [selectedBrand, setSelectedBrand] = useState('');
    const [currentPage, setCurrentPage] = useState(adminProduct.pageable.pageNumber);

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    useEffect(() => {
        dispatch(allProducts({
            jwt: localStorage.getItem('jwt') || '',
            page: currentPage,
            brand: selectedBrand || undefined,
            category: selectedCategory || undefined
        }));
        if (!inventory) {
            dispatch(getAllInventory());
        }
        if (Array.isArray(inventory)) {
            console.log('inventory:', inventory.map(i => ({ productId: i.productId, quantity: i.quantity, ...i })));
        } else {
            console.log('inventory:', inventory);
        }
    }, [currentPage, selectedCategory, inventory]);

    return (
        <AnimatePresence>
            <motion.div
                variants={tableVariants}
                initial="hidden"
                animate="visible"
                className="overflow-hidden"
            >
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 700}} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Hình ảnh sản phẩm</StyledTableCell>
                                <StyledTableCell>Tên sản phẩm</StyledTableCell>
                                <StyledTableCell align="right">Giá bán sản phẩm</StyledTableCell>
                                <StyledTableCell align="right">Màu sắc</StyledTableCell>
                                <StyledTableCell align="right">Tình trạng</StyledTableCell>
                                <StyledTableCell align="right">Cập nhật</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <AnimatePresence>
                                {adminProduct?.products?.length === 0 ? (
                                    <MotionTableRow
                                        variants={rowVariants}
                                        initial="hidden"
                                        animate="visible"
                                    >
                                        <StyledTableCell colSpan={6} rowSpan={12} align="center">
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 0.2 }}
                                            >
                                                Không có sản phẩm nào để hiển thị.
                                            </motion.div>
                                        </StyledTableCell>
                                    </MotionTableRow>
                                ) : (
                                    adminProduct?.products?.map((item: Product, index: number) => (
                                        <MotionTableRow
                                            key={item?.id}
                                            variants={rowVariants}
                                            initial="hidden"
                                            animate="visible"
                                            whileHover="hover"
                                        >
                                            <StyledTableCell component="th" scope="row">
                                                <motion.div 
                                                    className='flex w-20 h-20 gap-1 flex-wrap'
                                                    whileHover={{ scale: 1.05 }}
                                                >
                                                    <motion.img 
                                                        src={item?.images[0]} 
                                                        alt=''
                                                        className='w-full h-full object-cover rounded-md'
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        transition={{ delay: index * 0.1 }}
                                                        whileHover={{ scale: 1.1 }}
                                                    />
                                                </motion.div>
                                            </StyledTableCell>
                                            <StyledTableCell>
                                                <motion.div
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ delay: index * 0.1 }}
                                                    whileHover={{ color: "#009688" }}
                                                >
                                                    {item?.title}
                                                </motion.div>
                                            </StyledTableCell>
                                            <StyledTableCell align="right">
                                                <motion.div
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ delay: index * 0.1 }}
                                                >
                                                    {new Intl.NumberFormat('vi-VN', {
                                                        style: 'currency',
                                                        currency: 'VND'
                                                    }).format(item?.sellingPrice ?? 0)}
                                                </motion.div>
                                            </StyledTableCell>
                                            <StyledTableCell align="right">
                                                <motion.div
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ delay: index * 0.1 }}
                                                >
                                                    {item?.color}
                                                </motion.div>
                                            </StyledTableCell>
                                            <StyledTableCell align="right">
                                                <motion.div
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                    {(() => {
                                                        const inventoryItem = Array.isArray(inventory)
                                                          ? inventory.find((inv: any) => String(inv.productId) === String(item.id))
                                                          : null;
                                                        if (!inventoryItem || inventoryItem.quantity === 0) {
                                                          return (
                                                            <Button
                                                              size='small'
                                                              variant="outlined"
                                                              color="error"
                                                              sx={{ borderRadius: '20px', color: 'red', borderColor: 'red' }}
                                                            >
                                                              HẾT HÀNG
                                                            </Button>
                                                          );
                                                        }
                                                        return (
                                                          <Button
                                                            size='small'
                                                            variant="outlined"
                                                            color="success"
                                                            sx={{ borderRadius: '20px', color: 'green', borderColor: 'green' }}
                                                          >
                                                            CÒN HÀNG
                                                          </Button>
                                                        );
                                                    })()}
                                                </motion.div>
                                            </StyledTableCell>
                                            <StyledTableCell align="right">
                                                <motion.div
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                    <IconButton
                                                        onClick={() => navigate(`/admin/products/details-product/${item.id}`)}
                                                        color='primary' 
                                                        size='small'
                                                        sx={{
                                                            backgroundColor: 'rgba(0, 150, 136, 0.05)'
                                                        }}
                                                    >
                                                        <Edit/>
                                                    </IconButton>
                                                </motion.div>
                                            </StyledTableCell>
                                        </MotionTableRow>
                                    ))
                                )}
                            </AnimatePresence>
                        </TableBody>
                    </Table>
                </TableContainer>
                {adminProduct?.products?.length > 0 && (
                    <motion.div 
                        className="flex justify-center mt-4 gap-2"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 0}
                                variant="contained"
                                color="primary"
                            >
                                Previous
                            </Button>
                        </motion.div>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === adminProduct?.pageable.totalPages - 1}
                                variant="contained"
                                color="primary"
                            >
                                Next
                            </Button>
                        </motion.div>
                    </motion.div>
                )}
            </motion.div>
        </AnimatePresence>
    );
}
