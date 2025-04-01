import {createAsyncThunk} from "@reduxjs/toolkit";
import {Coupon} from "../../types/CouponType";
import {api} from "../../config/Api";

const API_URL = '/api/coupons';

export const createCoupon = createAsyncThunk<Coupon, {coupon: any; jwt: string}, {rejectValue: string}>(
    'coupons/createCoupon',
    async ({coupon, jwt}, {rejectWithValue}) => {
        try {
            const response = await api.post(`${API_URL}/admin/create`, coupon ,{
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            })
            console.log('create coupon', response.data)
            return response.data
        } catch (error : any) {
            return rejectWithValue(error.message)
        }
    }
)