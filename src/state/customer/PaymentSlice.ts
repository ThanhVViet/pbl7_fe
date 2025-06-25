import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {api} from "../../config/Api";
import {toast} from "sonner";


export const payWithVNPAy = createAsyncThunk<any, { data: any, paymentMethod: string, jwt: string }>(
    "payment/payWithVNPAy",
    async ({data, paymentMethod, jwt}, {rejectWithValue}) => {
        console.log('data', data);
        console.log('paymentMethod', paymentMethod);
        console.log('jwt', jwt);
        try {
            const response = await api.post(`/payment/online?paymentMethod=${paymentMethod}`, data, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                }
            })

            if (response.data.paymentUrl) {
                window.location.href = response.data.paymentUrl;
            }

            console.log('order created with payment', response.data);
            return response.data;
        } catch (e: any) {
            console.log('error create order with payment', e.response.data);
            return rejectWithValue(e.response.data);
        }
    }
)


export const paymentSuccess = createAsyncThunk<any, { paymentId: string, jwt: string, paymentLinkId: string }>(
    "payment/paymentSuccess",
    async ({paymentId, jwt, paymentLinkId}, {rejectWithValue}) => {
        try {
            const response = await api.get(`/payment/${paymentId}?paymentLinkId=${paymentLinkId}`, {
                headers: {Authorization: `Bearer ${jwt}`},
            })

            console.log('payment success', response.data);
            return response.data;
        } catch (e: any) {
            console.log('error pay', e.response);
            return rejectWithValue('Error pay');
        }
    }
)

interface PaymentState {
    paymentOrder: any | null;
    loading: boolean;
    error: string | null;
}

const initialState: PaymentState = {
    paymentOrder: null,
    loading: false,
    error: null,
}

const paymentSlice = createSlice({
    name: 'payment',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(payWithVNPAy.pending, (state) => {
                state.loading = true;
            })
            .addCase(payWithVNPAy.fulfilled, (state, action) => {
                state.loading = false;
                state.paymentOrder = action.payload;
                // toast.success('Payment successful');
            })
            .addCase(payWithVNPAy.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                const errorData = action.payload as any;
                toast.error(errorData?.message || 'Error creating order with payment');
            })
            .addCase(paymentSuccess.pending, (state) => {
                state.loading = true;
            })
            .addCase(paymentSuccess.fulfilled, (state, action) => {
                state.loading = false;
                toast.success('Payment successful');
            })
            .addCase(paymentSuccess.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                toast.error(action.payload as string);
            });
    }
})

export default paymentSlice.reducer;