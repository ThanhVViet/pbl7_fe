import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {api} from "../config/Api";
import {User} from "../types/UserType";
import {toast} from "sonner";


export const reset = createAsyncThunk('/auth/reset',
    async (ResetPasswordRequest: any, {rejectWithValue}) => {
        try {
            const res = await api.post('/identity/auth/reset', ResetPasswordRequest)
            console.log('reset password', res)
            return res.data.result

        } catch (e) {
            console.log('error fetch seller profile', e)
        }
    })

export const sendLoginSignupOtp = createAsyncThunk('/auth/sendLoginSignupOtp',
    async ({email}: { email: string }, {rejectWithValue}) => {
        try {
            const res = await api.post('/identity/auth/send-otp', {email})
            console.log('login otp', res)
            return res.data.result

        } catch (e) {
            console.log('error fetch seller profile', e)
        }
    })

export const signin = createAsyncThunk<any, { data: any, navigate: any }>('/auth/signin',
    async ({data, navigate}, {rejectWithValue}) => {
        try {
            console.log('login data', data)
            const res: any = await api.post('/identity/auth/token', data)
            if (res.data.code === 1000) {
                const {roles} = res.data.result;
                if (Array.isArray(roles) && roles.includes('ADMIN')) {
                    navigate('/admin')
                } else {
                    navigate('/')
                }
                console.log('login success', res.data)
                toast.success('Đăng nhập thành công')
                localStorage.setItem('jwt', res.data.result.token)
                // const {token, roles} = res.data.result;
                return res.data.result
            } else {
                toast.error('Kiểm tra lại thông tin đăng nhập')
            }

        } catch (e: any) {
            toast.error('Đăng nhập thất bại, vui lòng kiểm tra lại thông tin đăng nhập')
            console.log('error fetch seller profile', e)
        }
    })

export const signup = createAsyncThunk<any, any>('/auth/signup',
    async (signupRequest, {rejectWithValue}) => {
        try {
            const res = await api.post('/identity/users/registration', signupRequest)
            console.log('sign up success', res.data)
            return res.data
        } catch (e) {
            console.log('error fetch seller profile', e)
        }
    })

export const fetchUserProfile = createAsyncThunk<any, any>('/auth/fetchUserProfile',
    async ({jwt}, {rejectWithValue}) => {
        try {
            const res = await api.get('/identity/users/get-user', {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            })
            console.log('get user profile success', res.data)
            return res.data.result;

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
    otp: string,
    roles: string[]
}

const initialState: AuthState = {
    // jwt: null,
    jwt: localStorage.getItem('jwt'), // <-- rehydrate token
    otpSent: false,
    // isLogin: false,
    isLogin: !!localStorage.getItem('jwt'), // <-- treat as logged in if token exists

    user: null,
    loading: false,
    otp: '',
    roles: []
    // roles: JSON.parse(localStorage.getItem('roles') || '[]')
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
            state.otp = action.payload
        })

        builder.addCase(sendLoginSignupOtp.rejected, (state, action) => {
            state.loading = false
        })
        builder.addCase(signin.fulfilled, (state, action) => {
            if (action.payload && action.payload.token) {
                console.log('Roles payload:', action.payload.roles);
                state.jwt = action.payload.token;
                state.roles = Array.isArray(action.payload.roles)
                    ? action.payload.roles
                    : [];
                state.isLogin = true;
            } else {
                state.jwt = null;
                state.roles = [];
                state.isLogin = false;
            }
        });

        builder.addCase(signup.fulfilled, (state, action) => {
            state.jwt = action.payload
            state.isLogin = true
        })
        builder.addCase(fetchUserProfile.fulfilled, (state, action) => {
            state.user = action.payload
            state.isLogin = true
            state.roles = Array.isArray(action.payload?.roles)
                ? action.payload.roles.map((role: any) => role.name)
                : [];
        })
        builder.addCase(logout.fulfilled, (state, action) => {
            localStorage.removeItem('roles');
            localStorage.removeItem('jwt');
            state.jwt = null
            state.isLogin = false
            state.user = null
            state.roles = [];
        })
    }

})


export default authSlice.reducer