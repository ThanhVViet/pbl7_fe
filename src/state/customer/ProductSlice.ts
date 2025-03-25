import {createAsyncThunk} from "@reduxjs/toolkit";
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
    products: Product | any,

}