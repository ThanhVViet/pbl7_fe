import {Order, OrderItem, OrderState} from "../../types/OrderType";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {api} from "../../config/Api";
import {Address} from "../../types/UserType";

const API_URL = '/api/orders';

export const fetchUserOrderHistory = createAsyncThunk<Order[], string>(
    "order/fetchUserOrderHistory",
    async (jwt, {rejectWithValue}) => {
        try {
            const response = await api.get(`${API_URL}/user`, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            });
            console.log('fetch user order history', response.data);
            return response.data;
        } catch (e: any) {
            console.log('error fetch user order history', e.response);
            return rejectWithValue('Error fetching user order history');
        }
    }
)

export const fetchOrderById = createAsyncThunk<Order, { orderId: number, jwt: string }>(
    "order/fetchOrderById",
    async ({orderId, jwt}, {rejectWithValue}) => {
        try {
            const response = await api.get(`${API_URL}/${orderId}`, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            });

            console.log('fetch  order by id', response.data);
            return response.data;
        } catch (e: any) {
            console.log('error fetch  order by id', e.response);
            return rejectWithValue('Error fetching  order by id');
        }
    }
)

export const createOrder = createAsyncThunk<any, { address: Address, jwt: string, paymentGateway: string }>(
    "order/createOrder",
    async ({address, jwt, paymentGateway}, {rejectWithValue}) => {
        try {
            const response = await api.post(API_URL, address, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                },
                params: {paymentMethod: paymentGateway}
            });

            if (response.data.payment_link_url) {
                window.location.href = response.data.payment_link_url;
            }
            console.log('order created', response.data);
            return response.data;
        } catch (e: any) {
            console.log('error create order', e.response);
            return rejectWithValue('Error creating  order');
        }
    }
)

export const fetchOrderItemById = createAsyncThunk<OrderItem, { orderItemId: number, jwt: string }>(
    "order/fetchOrderItemById",
    async ({orderItemId, jwt}, {rejectWithValue}) => {
        try {
            const response = await api.get(`${API_URL}/item/${orderItemId}`, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            });

            console.log('fetch order item by id', response.data);
            return response.data;
        } catch (e: any) {
            console.log('error fetch order item by id', e.response);
            return rejectWithValue('Error fetching order item by id');
        }
    }
)


export const paymentSuccess = createAsyncThunk<any, { paymentId: string, jwt: string, paymentLinkId: string }>(
    "order/paymentSuccess",
    async ({paymentId, jwt, paymentLinkId}, {rejectWithValue}) => {
        try {
            const response = await api.get(`/api/payment/${paymentId}`, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            });

            console.log('payment success', response.data);
            return response.data;
        } catch (e: any) {
            console.log('error pay', e.response);
            return rejectWithValue('Error pay');
        }
    }
)

export const cancelOrder = createAsyncThunk<Order, any>(
    "order/cancelOrder",
    async (orderId, {rejectWithValue}) => {
        try {
            const response = await api.put(`${API_URL}/${orderId}/cancel`, {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwt')}`
                }
            });

            console.log('cancel order success', response.data);
            return response.data;
        } catch (e: any) {
            console.log('error cancel order', e.response);
            return rejectWithValue('Error cancelling order');
        }
    }
)

const initialState: OrderState = {
    orders: [],
    orderItem: null,
    currentOrder: null,
    paymentOrder: null,
    loading: false,
    error: null,
    orderCancelled: false
}

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchUserOrderHistory.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.orderCancelled = false
        })
        builder.addCase(fetchUserOrderHistory.fulfilled, (state, action) => {
            state.loading = false;
            state.orders = action.payload;
        })
        builder.addCase(fetchUserOrderHistory.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })

        builder.addCase(fetchOrderById.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(fetchOrderById.fulfilled, (state, action) => {
            state.loading = false;
            state.currentOrder = action.payload;
        })
        builder.addCase(fetchOrderById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })

        builder.addCase(createOrder.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(createOrder.fulfilled, (state, action) => {
            state.loading = false;
            state.paymentOrder = action.payload;
        })
        builder.addCase(createOrder.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })

        builder.addCase(fetchOrderItemById.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(fetchOrderItemById.fulfilled, (state, action) => {
            state.loading = false;
            state.orderItem = action.payload;
        })
        builder.addCase(fetchOrderItemById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })

        builder.addCase(paymentSuccess.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(paymentSuccess.fulfilled, (state, action) => {
            state.loading = false;
            console.log('payment success', action.payload);
        })
        builder.addCase(paymentSuccess.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })

        builder.addCase(cancelOrder.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.orderCancelled = false;
        })

        builder.addCase(cancelOrder.fulfilled, (state, action) => {
            state.loading = false;
            state.orders = (state.orders ?? []).map((order) => order.id === action.payload.id ? action.payload :
                order);
            state.orderCancelled = true;
            state.currentOrder = action.payload;

        })
        builder.addCase(cancelOrder.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })
    }
})

export default orderSlice.reducer;