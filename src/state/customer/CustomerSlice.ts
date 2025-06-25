import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {HomeCategory, HomeData} from "../../types/HomeCategoryType";
import {api} from "../../config/Api";

const API_URL = '/category'

export const createHomeCategories = createAsyncThunk<HomeData, HomeCategory[]>(
    'home/createHomeCategories',
    async (homeCategories, {rejectWithValue}) => {
        try {
            const response = await api.post(`${API_URL}/home/categories`, homeCategories)
            console.log('create home categories', response.data)
            return response.data
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)



// export const getUserProfile = createAsyncThunk(
//     'home/getUserProfile',
//     async (homeCategories, {rejectWithValue}) => {
//         try {
//             const response = await api.get('/identity/users/get-user',
//                 {
//                     headers: {
//                         Authorization: `Bearer ${localStorage.getItem('jwt')}`
//                     }
//                 })
//             console.log('user profile', response.data)
//             return response.data
//         } catch (error: any) {
//             return rejectWithValue(error.message)
//         }
//     }
// )



interface HomeState {
    homePageData: HomeData | null;
    homeCategories: HomeCategory[];
    loading: boolean;
    error: string | null;
    userData: any | null;
}

const initialState: HomeState = {
    homePageData: null,
    homeCategories: [],
    loading: false,
    error: null,
    userData: null
}

const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        builder.addCase(createHomeCategories.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(createHomeCategories.fulfilled, (state, action) => {
            state.loading = false;
            state.homePageData = action.payload;
        })
        builder.addCase(createHomeCategories.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })

        // builder.addCase(getUserProfile.pending, (state) => {
        //     state.loading = true;
        //     state.error = null;
        // })
        // builder.addCase(getUserProfile.fulfilled, (state, action) => {
        //     state.loading = false;
        //     state.userData = action.payload;
        // })
    }
})

export default homeSlice.reducer;