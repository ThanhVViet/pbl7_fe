import {Order, OrderStatus} from "../../types/OrderType";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {api} from "../../config/Api";


export const getSellerOrders = createAsyncThunk<Order[], string>(
    "sellerOrders/getSellerOrders",
    async (jwt, {rejectWithValue}) => {
        try {
            const response = await api.get('/order/admin/orders', {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            })
            console.log('seller orders', response.data)
            return response.data
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

export const updateOrderStatus = createAsyncThunk<Order, { orderId: number, orderStatus: OrderStatus, jwt: string }>(
    "sellerOrders/updateOrderStatus",
    async ({orderId, orderStatus, jwt}, {rejectWithValue}) => {
        try {
            const response = await api.put(`/order/admin/order/${orderId}/${orderStatus}`, {}, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            });

            console.log('update order status', response.data)
            return response.data
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

export const deleteOrder = createAsyncThunk<any, { orderId: number, jwt: string }>(
    'sellerOrders/deleteOrder',
    async ({orderId, jwt}, {rejectWithValue}) => {
        try {
            const response = await api.delete(`/api/seller/orders/${orderId}/delete`, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            })
            console.log('delete order', response.data)
            return response.data
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

interface SellerOrderState {
    orders: Order[];
    loading: boolean;
    error: string | null;
}

const initialState: SellerOrderState = {
    orders: [],
    loading: false,
    error: null
}

export const sellerOrderSlice = createSlice({
    name: 'sellerOrders',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getSellerOrders.pending, (state) => {
            state.loading = true
            state.error = null
        })
        builder.addCase(getSellerOrders.fulfilled, (state, action) => {
            state.loading = false
            state.orders = action.payload
        })
        builder.addCase(getSellerOrders.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload as string
        })
        builder.addCase(updateOrderStatus.pending, (state) => {
            state.loading = true
            state.error = null
        })
        builder.addCase(updateOrderStatus.fulfilled, (state, action) => {
            state.loading = false
            const index = state.orders.findIndex(order => order.id === action.payload.id)
            if (index !== -1) {
                state.orders[index] = action.payload
            }
            // state.orders = state.orders.map(order => order.id === action.payload.id ? action.payload : order)
        })
        builder.addCase(updateOrderStatus.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload as string
        })

        builder.addCase(deleteOrder.pending, (state) => {
            state.loading = true
            state.error = null
        })
        builder.addCase(deleteOrder.fulfilled, (state, action) => {
            state.loading = false
            state.orders = state.orders.filter(order => order.id !== action.meta.arg.orderId)
        })
        builder.addCase(deleteOrder.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload as string
        })
    }
})

export default sellerOrderSlice.reducer;




