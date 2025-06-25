import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {api} from "../../config/Api";
import {Product} from "../../types/ProductType";
import {toast} from "sonner";

// export const allProducts = createAsyncThunk<Product[], any>('/sellerProduct/allProducts',
//     async (jwt: string, {rejectWithValue}) => {
//         try {
//             const res = await api.get('/product/find-all', {
//                 headers: {
//                     Authorization: `Bearer ${jwt}`
//                 }
//             })
//             console.log('all product', res.data)
//             return res.data
//         } catch (e) {
//             console.log('fetch all product error ', e)
//         }
//     })

export const allProducts = createAsyncThunk<PaginatedProductResponse, {
    jwt: string,
    page: number,
    brand?: string,
    category?: string
}>('/adminProduct/allProducts',
    async ({jwt, page, brand, category}, {rejectWithValue}) => {
        try {
            const params = new URLSearchParams();
            params.append('pageNumber', page.toString());
            if (brand) params.append('brand', brand);
            if (category) params.append('category', category);

            const res = await api.get(`/product/find-all?${params.toString()}`, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            })
            console.log('all product', res.data)
            return res.data
        } catch (e) {
            console.log('fetch all product error ', e)
        }
    })

export const createProduct = createAsyncThunk<Product, { request: any, jwt: string | null }>(
    '/adminProduct/createProduct',
    async ({request, jwt}, {rejectWithValue}) => {
        try {
            const res = await api.post('/product/add', request, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            })
            console.log('create product ', res.data)
            return res.data
        } catch (e) {
            console.log('error create product ', e)
        }
    }
)

export const updateProduct = createAsyncThunk<Product, { productId: number, request: any, jwt: string | null }>(
    '/adminProduct/updateProduct',
    async ({productId, request, jwt}, {rejectWithValue}) => {
        try {
            const res = await api.post(`/product/update/${productId}`, request, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            })
            console.log('update product success ', res.data)
            toast.success('Cập nhật sản phẩm thành công !')
            return res.data
        } catch (e) {
            console.log('error update product ', e)
        }
    }
)

interface PaginatedProductResponse {
    content: Product[];
    pageable: {
        pageNumber: number;
        pageSize: number;
    };
    totalElements: number;
    totalPages: number;
}


interface SellerProductState {
    products: Product[],
    loading: boolean,
    error: string | null | undefined
    pageable: {
        pageNumber: number;
        pageSize: number;
        totalElements: number;
        totalPages: number;
    }
}

const initialState: SellerProductState = {
    products: [],
    loading: false,
    error: null,
    pageable: {
        pageNumber: 0,
        pageSize: 10,
        totalElements: 0,
        totalPages: 1
    }
}

const adminProductSlice = createSlice({
    name: 'adminProduct',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(allProducts.pending, (state) => {
            state.loading = true
        })
        builder.addCase(allProducts.fulfilled, (state, action) => {
            state.loading = false
            state.products = action.payload.content
            state.pageable = {
                pageNumber: action.payload.pageable.pageNumber,
                pageSize: action.payload.pageable.pageSize,
                totalElements: action.payload.totalElements,
                totalPages: action.payload.totalPages
            };
        })
        builder.addCase(allProducts.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })

        builder.addCase(createProduct.pending, (state) => {
            state.loading = true
        })
        builder.addCase(createProduct.fulfilled, (state, action) => {
            state.loading = false
            state.products?.push(action.payload)
        })
        builder.addCase(createProduct.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })
    }
})

export default adminProductSlice.reducer;