import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {api} from "../../config/Api";
import {toast} from "sonner";


export const getAllInventory = createAsyncThunk<any, void>(
    "inventory/getAllInventory",
    async (_, {rejectWithValue}) => {

        try {
            const response = await api.get('/inventory/all')
            console.log('get all inventory', response.data);
            return response.data;
        } catch (e: any) {
            console.log('error get all inventory', e.response);
            return rejectWithValue('Error get all inventory');
        }
    }
)

interface InventoryState {
    inventory: any | null;
    loading: boolean;
    error: string | null;
}

const initialState: InventoryState = {
    inventory: null,
    loading: false,
    error: null,
}


const inventorySlice = createSlice( {
    name: 'inventory',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
     builder
         .addCase(getAllInventory.pending,(state) => {
                state.loading = true;
                state.error = null;
         })
            .addCase(getAllInventory.fulfilled,(state, action) => {
                state.loading = false;
                state.inventory = action.payload;
            })
            .addCase(getAllInventory.rejected,(state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                toast.error(action.payload as string);
            })
    }
})

export default inventorySlice.reducer;