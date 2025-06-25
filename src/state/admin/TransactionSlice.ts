import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../config/Api";

export interface AdminTransaction {
  id: number;
  customerId: string;
  amount: number;
  orderId: number;
  date: string; // ISO string từ LocalDateTime
}

interface TransactionState {
  transactions: AdminTransaction[];
  loading: boolean;
  error: string | null;
}

const initialState: TransactionState = {
  transactions: [],
  loading: false,
  error: null,
};

export const fetchAllTransactions = createAsyncThunk<AdminTransaction[], string | void>(
  "admin/fetchAllTransactions",
  async (jwt, { rejectWithValue }) => {
    try {
      const response = await api.get("/payment/transactions", {
        headers: jwt ? { Authorization: `Bearer ${jwt}` } : {},
      });
      return response.data;
    } catch (e: any) {
      return rejectWithValue(e.response?.data?.message || "Lỗi lấy danh sách giao dịch");
    }
  }
);

const transactionSlice = createSlice({
  name: "adminTransaction",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload;
      })
      .addCase(fetchAllTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default transactionSlice.reducer; 