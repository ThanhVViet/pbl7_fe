import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {api} from "../../config/Api";
import {Product} from "../../types/ProductType";

const API_URL = 'http://localhost:5454'

export const fetchProductById = createAsyncThunk(
    '/products/fetchProductById',
    async (productId: number, {rejectWithValue}) => {
        try {
            const res = await api.get(`${API_URL}/products/${productId}`)
            console.log('product by id', res.data)
            return res.data
        } catch (e) {
            console.log('error fetch product by id', e)
            return rejectWithValue(e)
        }
    }
)

export const searchProduct = createAsyncThunk(
    '/products/searchProduct',
    async (query, {rejectWithValue}) => {
        try {
            const res = await api.get(`${API_URL}/products/search`, {
                params: {
                    query
                }
            })
            console.log('search product', res.data)
            return res.data
        } catch (e) {
            console.log('error fetch product by id', e)
            return rejectWithValue(e)
        }
    }
)

export const getAllProduct = createAsyncThunk<any, any>(
    '/products/getAllProduct',
    async (params, {rejectWithValue}) => {

        try {
            const res = await api.get(`${API_URL}/products`,
                {
                    params: {
                        ...params,
                        pageNumber: params.pageNumber || 0,
                    }
                })
            console.log('all product', res.data)
            return res.data
        } catch (e) {
            console.log('error fetch product by id', e)
            return rejectWithValue(e)
        }
    }
)

interface ProductState {
    products: Product[],
    product: Product | null,
    totalPages: number,
    loading: boolean,
    error: string | null | undefined,
    searchProducts: Product[]
}

const intialState: ProductState = {
    products: [],
    product: null,
    totalPages: 1,
    loading: false,
    error: null,
    searchProducts: []
}

const productSlice = createSlice({
    name: 'products',
    initialState: intialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchProductById.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchProductById.fulfilled, (state, action) => {
            state.loading = false
            state.product = action.payload
        })
        builder.addCase(fetchProductById.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })

        builder.addCase(searchProduct.pending, (state) => {
            state.loading = true
        })
        builder.addCase(searchProduct.fulfilled, (state, action) => {
            state.loading = false
            state.searchProducts = action.payload
        })
        builder.addCase(searchProduct.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })

        builder.addCase(getAllProduct.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getAllProduct.fulfilled, (state, action) => {
            state.loading = false
            state.products = action.payload.content
            // state.totalPages = action.payload
        })
        builder.addCase(getAllProduct.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })
    }
})

export default productSlice.reducer;