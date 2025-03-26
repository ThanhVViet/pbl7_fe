import {createAsyncThunk} from "@reduxjs/toolkit";
import {api} from "../config/Api";

export const sendLoginSignupOtp = createAsyncThunk('/auth/sendLoginSignupOtp',
    async ({email}: { email: string }, {rejectWithValue}) => {
        try {
            const res = await api.post('/auth/send-otp', {email})
            console.log('login otp', res)
        } catch (e) {
            console.log('error fetch seller profile', e)
        }
    })

export const signin = createAsyncThunk<any, any>('/auth/signin',
    async (loginRequest, {rejectWithValue}) => {
        try {
            const res = await api.post('/auth/signing', loginRequest)
            console.log('login as seller', res.data)

        } catch (e) {
            console.log('error fetch seller profile', e)
        }
    })

export const logout = createAsyncThunk<void, void>(
    '/auth/logout',
    async (_, {rejectWithValue}) => {

        try {
            localStorage.clear()
            console.log('logout success')
        } catch (e) {
            console.log('error logout', e)
        }
    })
