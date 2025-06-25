import React, {useEffect} from 'react';
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import {Product} from "../../../types/ProductType";
import {Button, IconButton} from "@mui/material";
import {Edit} from "@mui/icons-material";
import {styled} from "@mui/material/styles";
import TableCell, {tableCellClasses} from "@mui/material/TableCell";
import {useAppDispatch, useAppSelector} from "../../../state/store";
import {useNavigate} from "react-router-dom";
import {User} from "../../../types/UserType";
import {fetchAllUser, disableUser, enableUser} from "../../../state/admin/UserSlice";
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

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
        scale: 1.01,
        backgroundColor: "rgba(0, 150, 136, 0.04)",
        transition: { duration: 0.2 }
    }
};

const MotionTableRow = motion(StyledTableRow);

const UserTable = () => {
    const dispatch = useAppDispatch();
    const {users} = useAppSelector(store => store.user);
    const { jwt, user: currentUser } = useAppSelector(store => store.auth);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchAllUser(localStorage.getItem('jwt')));
    }, []);

    const handleDisable = async (userId: string) => {
        try {
            await dispatch(disableUser({ userId, jwt: jwt || '' })).unwrap();
            toast.success('Đã khoá tài khoản user!');
            dispatch(fetchAllUser(jwt || ''));
        } catch (e) {
            toast.error('Lỗi khi khoá tài khoản!');
        }
    };

    const handleEnable = async (userId: string) => {
        try {
            await dispatch(enableUser({ userId, jwt: jwt || '' })).unwrap();
            toast.success('Đã mở khoá tài khoản user!');
            dispatch(fetchAllUser(jwt || ''));
        } catch (e) {
            toast.error('Lỗi khi mở khoá tài khoản!');
        }
    };

    const filteredUsers = users?.filter(u => u.id !== currentUser?.id);

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
                                <StyledTableCell>No.</StyledTableCell>
                                <StyledTableCell>Tên người dùng</StyledTableCell>
                                <StyledTableCell>Email</StyledTableCell>
                                <StyledTableCell align="right">Cập nhật</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <AnimatePresence>
                                {filteredUsers?.map((item: User, index: number) => (
                                    <MotionTableRow
                                        key={item?.id}
                                        variants={rowVariants}
                                        whileHover="hover"
                                        initial="hidden"
                                        animate="visible"
                                        exit={{ opacity: 0, x: -20 }}
                                    >
                                        <StyledTableCell>
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
                                                {item?.username}
                                            </motion.div>
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: index * 0.1 }}
                                            >
                                                {item?.email}
                                            </motion.div>
                                        </StyledTableCell>
                                        <StyledTableCell align="right">
                                            <motion.div
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.95 }}
                                                style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}
                                            >
                                                {item.enabled === false ? (
                                                    <Button
                                                        variant="outlined"
                                                        color="success"
                                                        size="small"
                                                        onClick={() => handleEnable(String(item.id))}
                                                        sx={{ minWidth: 80, ml: 1, textTransform: 'none', fontWeight: 600 }}
                                                    >
                                                        Enable
                                                    </Button>
                                                ) : (
                                                    <Button
                                                        variant="outlined"
                                                        color="error"
                                                        size="small"
                                                        onClick={() => handleDisable(String(item.id))}
                                                        sx={{ minWidth: 80, ml: 1, textTransform: 'none', fontWeight: 600 }}
                                                    >
                                                        Disable
                                                    </Button>
                                                )}
                                            </motion.div>
                                        </StyledTableCell>
                                    </MotionTableRow>
                                ))}
                            </AnimatePresence>
                        </TableBody>
                    </Table>
                </TableContainer>
            </motion.div>
        </AnimatePresence>
    );
};

export default UserTable;
