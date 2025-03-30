import {Wishlist} from "../../types/WishlistType";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {api} from "../../config/Api";


export const getWishlistByUserId = createAsyncThunk(
    "wishlist/getWishlistByUserId",
    async ({jwt}: {jwt: string}, {rejectWithValue}) => {
        try {
            const response = await api.get('/api/wishlist',{
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            })
            console.log('user wishlist', response.data)
            return response.data
        } catch (error : any) {
            return rejectWithValue(error.message)
        }
    }
)

export const addProductToWishlist = createAsyncThunk(
    "wishlist/addProductToWishlist",
    async ({productId, jwt}: {productId:number, jwt:string}, {rejectWithValue}) => {
        try {
            const response = await api.post(`/api/wishlist/add-product/${productId}`,{},{
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            })
            console.log('add product to wishlist', response.data)
            return response.data
        } catch (error : any) {
            return rejectWithValue(error.message)
        }
    }
)



interface WishlistState {
    wishlist: Wishlist | null;
    loading: boolean;
    error: string | null;
}

const intialState: WishlistState = {
    wishlist: null,
    loading: false,
    error: null,
}

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState: intialState,
    reducers: {
        resetWishlistState: (state) => {
            state.wishlist = null;
            state.loading = false;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getWishlistByUserId.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(getWishlistByUserId.fulfilled, (state, action) => {
            state.loading = false;
            state.wishlist = action.payload
        })
        builder.addCase(getWishlistByUserId.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string
        })

        builder.addCase(addProductToWishlist.pending, (state) => {
            state.loading = true;
             state.error = null;
        })
        builder.addCase(addProductToWishlist.fulfilled, (state, action) => {
            state.loading = false;
            state.wishlist = action.payload
        })
        builder.addCase(addProductToWishlist.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string
        })
    }
})

export default wishlistSlice.reducer;