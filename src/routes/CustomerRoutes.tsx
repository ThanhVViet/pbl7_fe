import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../customer/pages/Home/Home';
import ProductDetails from '../customer/pages/Details/ProductDetails';
import Cart from '../customer/pages/Cart/Cart';
import Account from '../customer/pages/Account/Account';

const CustomerRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:productId" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/account/*" element={<Account />} />
            {/*<Route path="/category/:categoryId" element={<CategoryPage />} />*/}

        </Routes>
    );
};

export default CustomerRoutes; 