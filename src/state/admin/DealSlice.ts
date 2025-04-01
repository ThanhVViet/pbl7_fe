import {ApiResponse, Deal} from "../../types/DealType";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {api} from "../../config/Api";

 export const createDeal = createAsyncThunk(
     'deals/createDeal',
        async (deal: any, {rejectWithValue}) => {
            try {
                const response = await api.post('/admin/deals', deal,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('jwt')}`
                        }
                    })
                console.log('create deal', response.data)
                return response.data
            } catch (error : any) {
                return rejectWithValue(error.message)
            }
        }
 )

export const deleteDeal = createAsyncThunk<ApiResponse, number>(
    'deals/deleteDeal',
    async (id: number, {rejectWithValue}) => {
        try {
            const response = await api.delete(`/admin/deals/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwt')}`
                }
            })
            console.log('delete deal', response.data)
            return response.data
        } catch (error : any) {
            return rejectWithValue(error.message)
        }
    }
)

export const getAllDeals = createAsyncThunk(
    'deals/getAllDeals',
    async (_, {rejectWithValue}) => {
        try {
            const response = await api.get('/admin/deals')
            console.log('get all deals', response.data)
            return response.data
        } catch (error : any) {
            return rejectWithValue(error.message)
        }
    }
)


interface DealState {
    deals: Deal[];
    dealCreated: boolean;
    dealUpdated: boolean;
    loading: boolean;
    error: string | null;
}

const initialState : DealState ={
    deals: [],
    dealCreated: false,
    dealUpdated: false,
    loading: false,
    error: null
}

const dealSlice = createSlice({
    name: 'deals',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createDeal.fulfilled, (state, action) => {
            state.dealCreated = true
            state.deals.push(action.payload)
        })
        builder.addCase(createDeal.rejected, (state, action) => {
            state.error = action.payload as string
        })
        builder.addCase(deleteDeal.fulfilled, (state, action) => {
            state.deals = state.deals.filter(deal => deal.id !== action.meta.arg)
        })
        builder.addCase(deleteDeal.rejected, (state, action) => {
            state.error = action.payload as string
        })
        builder.addCase(getAllDeals.fulfilled, (state, action) => {
            state.deals = action.payload
        })
        builder.addCase(getAllDeals.rejected, (state, action) => {
            state.error = action.payload as string
        })
    }
})

export default dealSlice.reducer;