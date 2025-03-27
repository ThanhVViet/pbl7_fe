import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {api} from "../config/Api";
import {User} from "../types/Usertype";

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
            console.log('login success', res.data)
            localStorage.setItem('jwt', res.data.jwt)
            return res.data.jwt

        } catch (e) {
            console.log('error fetch seller profile', e)
        }
    })

export const signup = createAsyncThunk<any, any>('/auth/signup',
    async (signupRequest, {rejectWithValue}) => {
        try {
            const res = await api.post('/auth/signup', signupRequest)
            console.log('sign up success', res.data)
            localStorage.setItem('jwt', res.data.jwt)
            return res.data.jwt

        } catch (e) {
            console.log('error fetch seller profile', e)
        }
    })

export const fetchUserProfile = createAsyncThunk<any, any>('/auth/fetchUserProfile',
    async ({jwt}, {rejectWithValue}) => {
        try {
            const res = await api.get('/api/users/profile', {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            })
            console.log('get user profile success', res.data)
            return res.data;

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

interface AuthState {
    jwt: string | null,
    otpSent: boolean,
    isLogin: boolean,
    user: User | null
    loading: boolean
}

const initialState: AuthState = {
    jwt: null,
    otpSent: false,
    isLogin: false,
    user: null,
    loading: false
}
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(sendLoginSignupOtp.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(sendLoginSignupOtp.fulfilled, (state, action) => {
            state.otpSent = true
            state.loading = false
        })

        builder.addCase(sendLoginSignupOtp.rejected, (state, action) => {
            state.loading = false
        })
        builder.addCase(signin.fulfilled, (state, action) => {
            state.jwt = action.payload
            state.isLogin = true
        })
        builder.addCase(signup.fulfilled, (state, action) => {
            state.jwt = action.payload
            state.isLogin = true
        })
        builder.addCase(fetchUserProfile.fulfilled, (state, action) => {
            state.user = action.payload
            state.isLogin = true
        })
        builder.addCase(logout.fulfilled, (state, action) => {
            state.jwt = null
            state.isLogin = false
            state.user = null
        })
    }

})


export default authSlice.reducer