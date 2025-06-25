import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {api} from "../../config/Api";

// Response type cho thống kê đơn hàng theo tháng
export interface MonthlyOrderStatsResponse {
    month: number;
    totalOrders: number;
    totalRevenue: number;
}

interface StatState {
    monthlyStats: MonthlyOrderStatsResponse[];
    loading: boolean;
    error: string | null;
}

const initialState: StatState = {
    monthlyStats: [],
    loading: false,
    error: null,
};

export const fetchMonthlyOrderStats = createAsyncThunk<
    MonthlyOrderStatsResponse[],
    { year: number; jwt: string },
    { rejectValue: string }
>(
    "stat/fetchMonthlyOrderStats",
    async ({year, jwt}, {rejectWithValue}) => {
        try {

            const response = await api.get(`/order/stats/monthly/${year}`, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                },
            });
            console.log("stat order",response.data);
            return response.data.result;
        } catch (error: any) {
            return rejectWithValue(error.message || "Lỗi lấy thống kê đơn hàng");
        }
    }
);

const statSlice = createSlice({
    name: "stat",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMonthlyOrderStats.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMonthlyOrderStats.fulfilled, (state, action) => {
                state.loading = false;
                state.monthlyStats = action.payload;
            })
            .addCase(fetchMonthlyOrderStats.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Lỗi lấy thống kê đơn hàng";
            });
    },
});

export default statSlice.reducer;