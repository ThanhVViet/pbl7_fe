import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {api} from "../../config/Api";
import {CouponState} from "../../types/CouponType";
import {Cart} from "../../types/CartType";


const API_URL = '/api/coupons'
export const applyCoupon = createAsyncThunk<Cart, {apply: string, orderValue:string ,jwt: string | null; code: string }, {rejectValue: string}>(
    "coupon/applyCoupon",
    async ({apply, orderValue, jwt, code}, {rejectWithValue}) => {
        try {
            const response = await api.post(`${API_URL}/apply`, null, {
                params: {
                    apply,
                    orderValue,
                    code
                },
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            });
            console.log('apply coupon', response.data);
            return response.data;
        } catch (e: any) {
            console.log('error apply coupon', e.response);
            return rejectWithValue('Error applying coupon');
        }
    }
)

const initialState: CouponState = {
    coupons: [],
    cart: null,
    loading: false,
    error: null,
    couponCreated: false,
    couponApplied: false
}

const couponSlice = createSlice({
    name: 'coupon',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(applyCoupon.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.couponApplied = false;
        })
        builder.addCase(applyCoupon.fulfilled, (state, action) => {
            state.loading = false;
            state.cart = action.payload;
           if(action.meta.arg.apply === 'true'){
                state.couponApplied = true;
           }
        })
        builder.addCase(applyCoupon.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
            state.couponApplied = false;
        })
    }
})

export default couponSlice.reducer;