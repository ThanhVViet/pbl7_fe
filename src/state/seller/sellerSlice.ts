import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {api} from "../../config/Api";

export const fetchSellerProfile = createAsyncThunk('/sellers/fetchSellerProfile',
    async (jwt: string, {rejectWithValue}) => {
        try {
            const res = await api.get('/sellers/profile', {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            })
            console.log('seller profile', res.data)
            return res.data;
        }catch (e) {
            console.log('error fetch seller profile', e)
        }
})
interface SellerState {
    sellers: any[],
    selectedSeller: any | null,
    profile: any | null,
    report: any | null,
    error: any | null,
    loading: boolean
}

const initialState : SellerState = {
    sellers: [],
    selectedSeller: null,
    profile: null,
    report: null,
    error: null,
    loading: false
}

const sellerSlice = createSlice({
    name: 'sellers',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(fetchSellerProfile.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchSellerProfile.fulfilled, (state, action) => {
            state.loading = false
            state.profile = action.payload
        })
        builder.addCase(fetchSellerProfile.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
    }
})


export default sellerSlice.reducer;