import {Order, OrderItem, OrderState} from "../../types/OrderType";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {api} from "../../config/Api";
import {Address} from "../../types/UserType";
import {toast} from "sonner";


export const fetchUserOrderHistory = createAsyncThunk<Order[], string>(
    "order/fetchUserOrderHistory",
    async (jwt, {rejectWithValue}) => {
        try {
            const response = await api.get(`/order/user`, {
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
            const response = await api.get(`/order/${orderId}`, {
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
export const createOrder = createAsyncThunk<any, { data: any, jwt: string }>(
    "order/createOrder",
    async ({data, jwt}, {rejectWithValue}) => {
        try {
            const response = await api.post('/order/create', data, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            });

            console.log('order created', response.data);
            if (response.data.code === 1000) {
                toast.success('Đặt hàng thành công');
            }
            return response.data;
        } catch (e: any) {
            toast.error('This address is already exists !!')
            console.log('error create order', e.response);
            return rejectWithValue('Error creating  order');
        }
    }
)
// export const createOrder = createAsyncThunk<any, { address: Address, jwt: string, paymentGateway: string }>(
//     "order/createOrder",
//     async ({address, jwt, paymentGateway}, {rejectWithValue}) => {
//         try {
//             const response = await api.post('/order/create', address, {
//                 headers: {
//                     Authorization: `Bearer ${jwt}`
//                 },
//                 params: {paymentMethod: paymentGateway}
//             });
//
//            if (response.data.paymentUrl) {
//                 window.location.href = response.data.paymentUrl;
//             }
//             console.log('order created', response.data);
//             return response.data;
//         } catch (e: any) {
//             console.log('error create order', e.response);
//             return rejectWithValue('Error creating  order');
//         }
//     }
// )

export const fetchOrderItemById = createAsyncThunk<OrderItem, { orderItemId: number, jwt: string }>(
    "order/fetchOrderItemById",
    async ({orderItemId, jwt}, {rejectWithValue}) => {
        try {
            const response = await api.get(`/item/${orderItemId}`, {
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
            const response = await api.get(`/payment/online/vn-pay-callback`, {
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
            const response = await api.put(`/order/cancel/${orderId}`, {}, {
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

export const fetchUserAddress = createAsyncThunk<any, string>(
    "order/fetchUserAddress",
    async (jwt, {rejectWithValue}) => {
        try {
            const response = await api.get('/identity/users/addresses', {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            });
            console.log('fetch user address', response.data);
            return response.data.result;
        } catch (e: any) {
            console.log('error fetch user address', e.response);
            return rejectWithValue('Error fetching user address');
        }
    }
)

export const fetchAllAddress = createAsyncThunk<any, string>(
    "order/fetchAllAddress",
    async (jwt, {rejectWithValue}) => {
        try {
            const response = await api.get('/identity/users/all-address', {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            });
            console.log('fetch all address', response.data);
            return response.data;
        } catch (e: any) {
            console.log('error fetch all address', e.response);
            return rejectWithValue('Error fetching all address');
        }
    }
)

export const fetchAddressById = createAsyncThunk<any, { jwt: string, addressId: number }>(
    "order/fetchAddressById",
    async ({jwt, addressId}, {rejectWithValue}) => {
        try {
            console.log('addressId', addressId)
            const response = await api.get(`/identity/users/address/${addressId}`,
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`
                    }
                });
            console.log('fetch address by id', response.data);
            return response.data;
        } catch (e: any) {
            console.log('error fetch address by id', e.response);
            return rejectWithValue('Error fetching address by id');
        }
    }
)

export const createAddress = createAsyncThunk<any, { deliveryAddress: Address, jwt: string }>(
    "order/createAddress",
    async ({deliveryAddress, jwt}, {rejectWithValue}) => {
        try {
            console.log('data address', deliveryAddress);
            const response = await api.post('/identity/users/add-address', deliveryAddress, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            });

            console.log('create address', response.data);
            if (response.data.code === 1000) {
                toast.success('Address created successfully')
            }
            return response.data;
        } catch (e: any) {
            toast.error('This address is already exists !!')
            console.log('error create address', e.response);
            return rejectWithValue('Error creating  address');
        }
    }
)

export const updateAddress = createAsyncThunk<any, { addressId: number, deliveryAddress: Address, jwt: string }>(
    "order/updateAddress",
    async ({ addressId, deliveryAddress, jwt }, { rejectWithValue }) => {
        try {
            const response = await api.put(`/identity/users/update-address/${addressId}`, deliveryAddress, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            });
            if (response.data.code === 1000) {
                toast.success('Cập nhật địa chỉ thành công');
            }
                        console.log('update address', response.data);
            return response.data;
        } catch (e: any) {
            toast.error('Cập nhật địa chỉ thất bại!');
            return rejectWithValue('Error updating address');
        }
    }
)

export const deleteAddress = createAsyncThunk<any, { addressId: number, jwt: string }>(
    "order/deleteAddress",
    async ({addressId, jwt}, {rejectWithValue}) => {
        try {
            const response = await api.delete(`/identity/users/addresses/${addressId}`, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            });
            return response.data;
        } catch (e: any) {
            console.log('error delete address', e.response);
            return rejectWithValue('Error deleting address');
        }
    }
);

const initialState: OrderState = {
    orders: [],
    addresses: [],
    address: null,
    orderItem: null,
    currentOrder: null,
    paymentOrder: null,
    loading: false,
    error: null,
    orderCancelled: false,
    lastOrderTime: null
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
            state.lastOrderTime = Date.now();
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
        builder.addCase(fetchUserAddress.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(fetchUserAddress.fulfilled, (state, action) => {
            state.loading = false;
            state.addresses = action.payload;
        })
        builder.addCase(fetchUserAddress.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })

        builder.addCase(createAddress.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(createAddress.fulfilled, (state, action) => {
            state.loading = false;
            console.log('API Response:', action.payload);
            if (action.payload && action.payload.name) {
                state.addresses.push(action.payload);
            } else {
                console.error('Received invalid address:', action.payload);
            }
        });

        builder.addCase(createAddress.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })
        builder.addCase(fetchAddressById.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(fetchAddressById.fulfilled, (state, action) => {
            state.loading = false;
            state.address = action.payload;
        })
        builder.addCase(fetchAddressById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })

        builder.addCase(fetchAllAddress.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(fetchAllAddress.fulfilled, (state, action) => {
            state.loading = false;
            console.log('action.payload', action.payload)
            state.addresses = action.payload;
        })
        builder.addCase(fetchAllAddress.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })

    }
})

export default orderSlice.reducer;