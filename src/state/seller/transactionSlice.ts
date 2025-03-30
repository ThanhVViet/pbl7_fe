import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {Transaction} from "../../types/TransactionType";
import {api} from "../../config/Api";


export const fetchTransactionBySeller = createAsyncThunk<Transaction[], string>(
    "transactions/fetchTransactionBySeller",
    async (jwt, {rejectWithValue}) => {
        try {
            const response = await api.get('/api/transactions/seller',{
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            })
            console.log('seller transactions', response.data)
            return response.data
        } catch (error : any) {
            return rejectWithValue(error.message)
        }
    }
)


interface TransactionState {
    transactions: Transaction[] ;
    transaction: Transaction | null;
    loading: boolean;
    error: string | null;
}

const intialState: TransactionState = {
    transactions: [],
    transaction: null,
    loading: false,
    error: null,
}

const transactionSlice = createSlice({
    name: 'transactions',
    initialState: intialState,
    reducers: {
    },
    extraReducers: builder => {
        builder.addCase(fetchTransactionBySeller.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchTransactionBySeller.fulfilled, (state, action) => {
            state.transactions = action.payload;
            state.loading = false;
        })
        builder.addCase(fetchTransactionBySeller.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })
    }
}
)