import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {HomeCategory} from "../../types/HomeCategoryType";
import {api} from "../../config/Api";

const API_URL = '/admin';

export const updateHomeCategory = createAsyncThunk<HomeCategory, { id: number, data: HomeCategory, jwt: string }>(
    'homeCategory/updateHomeCategory',
    async ({id, data, jwt}, {rejectWithValue}) => {
        try {
            const response = await api.patch(`/category${API_URL}/home-category/${id}`, data,
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`
                    }
                }
            )
            console.log('update home category', response.data)
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

export const createHomeCategory = createAsyncThunk<HomeCategory, { name: string; image: string; categoryId: string, jwt: string }>(
    'homeCategory/createHomeCategory',
    async ({name, image, categoryId, jwt}, {rejectWithValue}) => {
        try {
            const response = await api.post(`/category${API_URL}/home-category`, {name, image, categoryId},
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`
                    }
                }
            )
            console.log('create home category', response.data)
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)
export const fetchHomeCategories = createAsyncThunk<HomeCategory[]>(
    'homeCategory/fetchHomeCategories',
    async (_, {rejectWithValue}) => {
        try {
            const response = await api.get('/category/admin/home-category')
            console.log('fetch home categories', response.data)
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

export const fetchHomeCategoryById = createAsyncThunk<HomeCategory, {id: number, jwt: string}>(
    'homeCategory/fetchHomeCategoryById',
    async ({id, jwt}, { rejectWithValue }) => {
        try {
            const response = await api.get(`/category/admin/home-category/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`
                    }
                }
            );
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

interface HomeCategoryState {
    categories: HomeCategory[];
    category: HomeCategory | null;
    loading: boolean;
    error: string | null;
    categoryUpdated: boolean;
}

const initialState: HomeCategoryState = {
    categories: [],
    category: null,
    loading: false,
    error: null,
    categoryUpdated: false
}

const homeCategorySlice = createSlice({
    name: 'homeCategory',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(updateHomeCategory.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.categoryUpdated = false;
        })

        builder.addCase(updateHomeCategory.fulfilled, (state, action) => {
            state.loading = false;
            state.categoryUpdated = true;
            const index = state.categories.findIndex((category) => category.id === action.payload.id)
            if (index !== -1) {
                state.categories[index] = action.payload
            } else {
                state.categories.push(action.payload)
            }
        })

        builder.addCase(updateHomeCategory.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })


        builder.addCase(createHomeCategory.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(createHomeCategory.fulfilled, (state, action) => {
            state.loading = false;
            const index = state.categories.findIndex((category) => category.id === action.payload.id)
            if (index !== -1) {
                state.categories[index] = action.payload
            } else {
                state.categories.push(action.payload)
            }
        })

        builder.addCase(createHomeCategory.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })


        builder.addCase(fetchHomeCategories.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.categoryUpdated = false;
        })

        builder.addCase(fetchHomeCategories.fulfilled, (state, action) => {
            state.loading = false;
            state.categories = action.payload
        })

        builder.addCase(fetchHomeCategories.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })

    }
})

export default homeCategorySlice.reducer;