import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {api} from "../../config/Api";
import {Product} from "../../types/ProductType";

export const fetchSellerProducts = createAsyncThunk<Product[], any>('/sellerProduct/fetchSellerProducts',
    async (jwt: string, {rejectWithValue}) => {
        try {
            const res = await api.get('/sellers/products', {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            })
            console.log('sellers product', res.data)
            return res.data
        } catch (e) {
            console.log('fetch product seller', e)
        }
    })

export const createProduct = createAsyncThunk<Product, {request:any, jwt:string | null}>(
    '/sellerProduct/createProduct',
    async ({request, jwt}, {rejectWithValue}) => {
        try {
            const res = await api.post('/sellers/products', request, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            })
            console.log('create product seller', res.data)
            return res.data
        } catch (e) {
            console.log('error create product seller', e)
        }
    }
)

interface SellerProductState {
    products: Product[],
    loading: boolean,
    error: string | null | undefined
}

const initialState: SellerProductState = {
    products: [],
    loading: false,
    error: null
}

const sellerProductSlice = createSlice({
    name: 'sellerProduct',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchSellerProducts.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchSellerProducts.fulfilled, (state, action) => {
            state.loading = false
            state.products = action.payload
        })
        builder.addCase(fetchSellerProducts.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })

        builder.addCase(createProduct.pending, (state) => {
            state.loading = true
        })
        builder.addCase(createProduct.fulfilled, (state, action) => {
            state.loading = false
            state.products.push(action.payload)
        })
        builder.addCase(createProduct.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })
    }
})

export default sellerProductSlice.reducer;