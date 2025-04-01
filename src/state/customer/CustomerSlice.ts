import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {HomeCategory, HomeData} from "../../types/HomeCategoryType";
import {api} from "../../config/Api";
import {homeCategories} from "../../data/homeCategories";

// export const fetchHomePageData = createAsyncThunk<HomeData>(
//     'home/fetchHomePageData',
//     async (_, {rejectWithValue}) => {
//         try {
//             const response = await api.get('/home-page')
//             console.log('fetch home page data', response.data)
//             return response.data
//         } catch (error: any) {
//             return rejectWithValue(error.message)
//         }
//     }
// )

export const createHomeCategories = createAsyncThunk<HomeData, HomeCategory[]>(
    'home/createHomeCategories',
    async (homeCategories, {rejectWithValue}) => {
        try {
            const response = await api.post('/home/categories', homeCategories)
            console.log('create home categories', response.data)
            return response.data
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

interface HomeState {
    homePageData: HomeData | null;
    homeCategories: HomeCategory[];
    loading: boolean;
    error: string | null;
}

const initialState: HomeState = {
    homePageData: null,
    homeCategories: [],
    loading: false,
    error: null
}

const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // builder.addCase(fetchHomePageData.pending, (state) => {
        //     state.loading = true;
        //     state.error = null;
        // })
        // builder.addCase(fetchHomePageData.fulfilled, (state, action) => {
        //     state.loading = false;
        //     state.homePageData = action.payload;
        // })
        // builder.addCase(fetchHomePageData.rejected, (state, action) => {
        //     state.loading = false;
        //     state.error = action.payload as string;
        // })
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
    }
})

export default homeSlice.reducer;