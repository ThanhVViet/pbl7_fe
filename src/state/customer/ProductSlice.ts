import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {api} from "../../config/Api";
import {Product} from "../../types/ProductType";


export const fetchProductById = createAsyncThunk<any, {productId: number, jwt: string}>(
    '/products/fetchProductById',
    async ({productId, jwt}, {rejectWithValue}) => {
        try {
            const res = await api.get(`/product/${productId}`,
                {
                    headers:{
                        Authorization: `Bearer ${jwt}`
                    }
                })
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
    async (query: string, {rejectWithValue}) => {
        try {
            const res = await api.get(`/product/search`, {
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
            const res = await api.get('/product/find-all',
                {
                    params: {
                        ...params,
                        pageNumber: params.pageNumber || 0,
                        category: params.category

                    },
                    headers:{
                        Authorization: `Bearer ${localStorage.getItem('jwt')}`
                    }
                })
            console.log('all product', res.data)
            return res.data
        } catch (e) {
            console.log('error fetch all product', e)
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
         state.searchProducts = [];

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