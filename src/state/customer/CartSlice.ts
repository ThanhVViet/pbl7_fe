import {Cart, CartItem} from "../../types/CartType";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {api} from "../../config/Api";
import {sumCartItemMrpPrice} from "../../utils/sumCartItemMrpPrice";
import {sumCartItemSellingPrice} from "../../utils/sumCartItemSellingPrice";
import {applyCoupon} from "./CouponSlice";

const API_URL = '/api/cart';

export const fetchUserCart = createAsyncThunk<Cart, string>(
    'cart/fetchUserCart',
    async (jwt: string, {rejectWithValue}) => {
        try {
            const response = await api.get(API_URL, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            });
            console.log('fetch user cart', response.data);
            return response.data;
        } catch (e: any) {
            console.log('error get user cart', e.response);
            return rejectWithValue('Error fetching user cart');
        }
    }
)

interface AddItemRequest {
    productId: number | undefined,
    size: string,
    quantity: number
}

export const addItemToCart = createAsyncThunk<CartItem, { jwt: string | null; request: AddItemRequest }>(
    'cart/addItemToCart',
    async ({jwt, request}, {rejectWithValue}) => {
        try {
            const response = await api.put(`${API_URL}/add`, request, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            });
            return response.data;
        } catch (e: any) {
            console.log('error add item to cart', e.response);
            return rejectWithValue('Error adding item to cart');
        }
    }
)

export const deleteCartItem = createAsyncThunk<any, { jwt: string | null; cartItemId: number }>(
    'cart/deleteCartItem',
    async ({jwt, cartItemId}, {rejectWithValue}) => {
        try {
            const response = await api.delete(`${API_URL}/item/${cartItemId}`, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            });
            return response.data;
        } catch (e: any) {
            console.log('failed to delete cart item', e.response);
            return rejectWithValue('failed to delete cart item');
        }
    }
)

export const updateCartItem = createAsyncThunk<any, { jwt: string | null; cartItemId: number, cartItem: any }>(
    'cart/updateCartItem',
    async ({jwt, cartItemId, cartItem}, {rejectWithValue}) => {
        try {
            const response = await api.put(`${API_URL}/item/${cartItemId}`, cartItem, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            });
            console.log('update cart item', response.data);
            return response.data;
        } catch (e: any) {
            console.log('failed to update cart item', e.response);
            return rejectWithValue('failed to update cart item');
        }
    }
)

interface CartState {
    cart: Cart | null,
    loading: boolean,
    error: string | null
}

const initialState: CartState = {
    cart: null,
    loading: false,
    error: null
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        resetCartState: (state) => {
            state.cart = null;
            state.loading = false;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUserCart.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(fetchUserCart.fulfilled, (state, action) => {
            state.loading = false;
            state.cart = action.payload;
        })
        builder.addCase(fetchUserCart.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })
        builder.addCase(addItemToCart.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(addItemToCart.fulfilled, (state, action) => {
            if (state.cart) {
                state.cart.cartItems.push(action.payload);
            }
            state.loading = false;
        })
        builder.addCase(addItemToCart.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })


        builder.addCase(deleteCartItem.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(deleteCartItem.fulfilled, (state, action) => {
            if (state.cart) {
                state.cart.cartItems = state.cart.cartItems.filter(item => item.id !== action.meta.arg.cartItemId);

                const mrpPrice = sumCartItemMrpPrice(state.cart?.cartItems || []);
                const sellingPrice = sumCartItemSellingPrice(state.cart?.cartItems || []);
                state.cart.totalSellingPrice = sellingPrice;
                state.cart.totalMrpPrice = mrpPrice;

            }
            state.loading = false;
        })
        builder.addCase(deleteCartItem.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })
        builder.addCase(updateCartItem.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(updateCartItem.fulfilled, (state, action) => {
            if (state.cart) {
                const index = state.cart.cartItems.findIndex(item => item.id === action.meta.arg.cartItemId);
                if (index !== -1) {
                    state.cart.cartItems[index] = {
                        ...state.cart.cartItems[index],
                        ...action.payload
                    }
                }
                const mrpPrice = sumCartItemMrpPrice(state.cart?.cartItems || [])
                const sellingPrice = sumCartItemSellingPrice(state.cart?.cartItems || [])
                state.cart.totalSellingPrice = sellingPrice
                state.cart.totalMrpPrice = mrpPrice
            }
            state.loading = false;
        })
        builder.addCase(updateCartItem.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })

        builder.addCase(applyCoupon.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload;
        })
    }

})

export default cartSlice.reducer;
