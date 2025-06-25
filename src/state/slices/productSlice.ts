import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { FilterState } from '../../types/FilterType';
import axios from 'axios';
import {api} from "../../config/Api";
import {Category, Product} from "../../types/ProductType";

// interface Product {
//     id: number;
//     name: string;
//     price: number;
//     image: string;
//     brand: string;
//     category: Category;
//     color: string;
// }

interface ProductState {
    products: Product[];
    totalPages: number;
    loading: boolean;
    error: string | null;
}

const initialState: ProductState = {
    products: [],
    totalPages: 0,
    loading: false,
    error: null
};

export const fetchProducts = createAsyncThunk(
    'product/fetchProducts',
    async (filters: FilterState) => {
        const params = new URLSearchParams();
        if (filters.category) params.append('category', filters.category);
        if (filters.brand) params.append('brand', filters.brand);
        if (filters.color) params.append('color', filters.color);
        if (filters.maxPrice) params.append('maxPrice', filters.maxPrice.toString());
        if (filters.minPrice) params.append('minPrice', filters.minPrice.toString());
        if (filters.sort) params.append('sort', filters.sort);
        if (filters.pageNumber !== undefined) params.append('pageNumber', filters.pageNumber.toString());

        const response = await api.get(`/product/find-all?${params.toString()}`);
        console.log('fetchProducts response', response.data);
        return response.data;
    }
);

const filterProductSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload.content;
                state.totalPages = action.payload.totalPages;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch products';
            });
    }
});

export default filterProductSlice.reducer;