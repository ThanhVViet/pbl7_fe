import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import Coupon from "../admin/pages/Coupon/Coupon";
import AddNewCouponForm from "../admin/pages/Coupon/AddNewCouponForm";
import GridTable from "../admin/pages/HomePage/GridTable";
import ShopByCategoryTable from "../admin/pages/HomePage/ShopByCategoryTable";
import Products from "../admin/pages/Product/Products";
import AddProduct from "../admin/pages/Product/AddProduct";
import {useAppSelector} from "../state/store";
import Order from "../admin/pages/Order/Orders";
import ProductDetails from "../admin/pages/Product/ProductDetails";
import Users from "../admin/pages/User/Users";
import AddCategory from "../admin/pages/Category/AddCategory";
import OrderStat from "../admin/pages/Stat/OrderStat";
import TransactionTable from '../admin/pages/Order/TransactionTable';

const AdminRoutes = () => {
    const {roles} = useAppSelector(state => state.auth);
    const isAdmin = roles.includes("ADMIN");



    if (!isAdmin) {
        return <Navigate to="/" replace />;
    }



    return (
        <Routes>
            <Route path='/' element={<OrderStat/>}/>
            <Route path='/coupon' element={<Coupon/>}/>
            <Route path='/orders' element={<Order/>}/>
            <Route path='/add-coupon' element={<AddNewCouponForm/>}/>
            <Route path='/add-category' element={<AddCategory/>}/>
            <Route path='/home-grid' element={<GridTable/>}/>
            <Route path='/category' element={<ShopByCategoryTable/>}/>
            <Route path='/products' element={<Products/>}/>
            <Route path='/users' element={<Users/>}/>
            <Route path='/products/add-product' element={<AddProduct />}/>
            <Route path='/products/details-product/:productId' element={<ProductDetails />}/>
            <Route path='/transaction' element={<TransactionTable />}/>
        </Routes>
    );
};

export default AdminRoutes;
