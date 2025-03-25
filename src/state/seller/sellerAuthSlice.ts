import {createAsyncThunk} from "@reduxjs/toolkit";
import {api} from "../../config/Api";

export const sellerLogin = createAsyncThunk<any, any>('/sellers/sellerLogin',
    async (loginRequest, {rejectWithValue}) => {
        try {
            const res = await api.post('/sellers/login', loginRequest)
            console.log('login as seller', res.data)

            const jwt = res.data.jwt;
            localStorage.setItem('jwt', jwt)

        }catch (e) {
            console.log('error fetch seller profile', e)
        }
})