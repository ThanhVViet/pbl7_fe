import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../state/store';
import { fetchAllTransactions, AdminTransaction } from '../../../state/admin/TransactionSlice';
import { Table, TableBody, TableContainer, TableHead, TableRow, Paper, CircularProgress } from '@mui/material';
import { RootState } from '../../../state/store';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import {fetchAllUser} from "../../../state/admin/UserSlice";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const TransactionTable = () => {
  const dispatch = useAppDispatch();
  const { transactions, loading, error } = useAppSelector((state: RootState) => state.adminTransaction);
  const { users } = useAppSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch(fetchAllTransactions(localStorage.getItem('jwt') || ''));
    if (!users || users.length === 0) {
      dispatch(fetchAllUser(localStorage.getItem('jwt') || ''));
    }
  }, [dispatch]);

  // Hàm lấy tên user từ customerId
  const getUserName = (customerId: string | number) => {
    if (!users) return 'Không rõ';
    const user = users.find(u => String(u.id) === String(customerId));
    return user ? user.username : 'Không rõ';
  };

  return (
    <div className="p-5">
      <h2 className="text-2xl font-semibold mb-4">Danh sách giao dịch</h2>
      {loading ? (
        <div className="flex justify-center py-10"><CircularProgress /></div>
      ) : error ? (
        <div className="text-red-500 text-center py-10">{error}</div>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>STT</StyledTableCell>
                <StyledTableCell>Tên khách hàng</StyledTableCell>
                <StyledTableCell>Mã đơn hàng</StyledTableCell>
                <StyledTableCell>Số tiền</StyledTableCell>
                <StyledTableCell>Ngày giao dịch</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map((item: AdminTransaction, idx: number) => (
                <StyledTableRow key={item.id}>
                  <StyledTableCell>{idx + 1}</StyledTableCell>
                  <StyledTableCell>{getUserName(item.customerId)}</StyledTableCell>
                  <StyledTableCell>{item.orderId}</StyledTableCell>
                  <StyledTableCell>{item.amount?.toLocaleString('vi-VN')} đ</StyledTableCell>
                  <StyledTableCell>{new Date(item.date).toLocaleString('vi-VN')}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default TransactionTable; 