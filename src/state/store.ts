import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {thunk} from "redux-thunk";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import sellerSlice from "./seller/sellerSlice";
import adminProductSlice from "./admin/ProductSlice";
import productSlice from "./customer/ProductSlice";
import filterProductSlice from "./slices/productSlice";
import authSlice from "./AuthSlice";
import cartSlice from "./customer/CartSlice";
import orderSlice from "./customer/OrderSlice";
import wishlistSlice from "./customer/WishlistSlice";
import sellerOrderSlice from "./seller/sellerOrderSlice";
import transactionSlice from "./admin/TransactionSlice";
import homeCategorySlice from "./admin/AdminSlice";
import homeSlice from "./customer/CustomerSlice";
import dealSlice from "./admin/DealSlice";
import userSlice from "./admin/UserSlice";
import paymentSlice from "./customer/PaymentSlice";
import inventorySlice from "./admin/InventorySlice";
import statSlice from "./admin/StatSlice";

const rootReducer = combineReducers({
    seller: sellerSlice,
    product: productSlice,
    adminProduct: adminProductSlice,
    filterProduct: filterProductSlice,
    auth: authSlice,
    cart: cartSlice,
    order: orderSlice,
    wishlist: wishlistSlice,
    customer: homeSlice,
    user: userSlice,
    payment: paymentSlice,
    sellerOrder: sellerOrderSlice,
    adminTransaction: transactionSlice,
    inventory: inventorySlice,

    //admin
    admin: homeCategorySlice,
    deal: dealSlice,
    stat: statSlice
})
const store = configureStore({
    reducer: rootReducer
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof rootReducer>
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store;