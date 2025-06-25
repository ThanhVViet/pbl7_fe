import React, {useEffect, useRef} from 'react';
import './App.css';
import Navbar from "./customer/components/Navbar";
import {ThemeProvider} from "@mui/material";
import customTheme from "./theme/customTheme";
import Home from "./customer/pages/Home/Home";
import Product from "./customer/pages/Product/Product";
import ProductDetails from "./customer/pages/Details/ProductDetails";
import Review from "./customer/pages/Review/Review";
import Cart from "./customer/pages/Cart/Cart";
import Checkout from "./customer/pages/Checkout/Checkout";
import Account from "./customer/pages/Account/Account";
import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import BecomeSeller from "./customer/pages/Become Seller/BecomeSeller";
import SellerDashboard from "./seller/pages/SellerDashboard/SellerDashboard";
import AdminDashboard from "./admin/pages/Dashboard/AdminDashboard";
import {fetchProduct} from "./state/fetchProduct";
import {useAppDispatch, useAppSelector} from "./state/store";
import Auth from "./customer/pages/Auth/Auth";
import {fetchUserProfile} from "./state/AuthSlice";
import PaymentSuccess from "./customer/components/PaymentSuccess";
import Wishlist from "./customer/pages/Wishlist/Wishlist";
import {createHomeCategories} from "./state/customer/CustomerSlice";
import {homeCategories} from "./data/homeCategories";
import {Toaster} from "sonner";
import EmailVerified from "./customer/pages/Auth/EmailVerified";
import Footer from "./customer/components/Footer";
import ProductList from "./customer/pages/Product/ProductList/ProductList";
import Chatbot from "./customer/components/Chatbot";

function App() {

    const dispatch = useAppDispatch()

    const {auth} = useAppSelector(store => store)
    const navigate = useNavigate()

    const location = useLocation();
    const hideFooter = location.pathname.startsWith('/admin') || location.pathname.startsWith('/seller') ||
    location.pathname.startsWith('/login')

    useEffect(() => {
        dispatch(fetchUserProfile({jwt: auth.jwt}))
    }, [auth.jwt]);


    const hasCreated = useRef(false);

    useEffect(() => {
        if (!hasCreated.current) {
            hasCreated.current = true;
            dispatch(createHomeCategories(homeCategories));
        }
    }, [dispatch]);


    return (
        <ThemeProvider theme={customTheme}>
            <Toaster position="top-right" richColors/>

            <div>
                <Navbar/>
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/login' element={<Auth/>}/>
                    <Route path="/email-verified" element={<EmailVerified/>}/>
                    {/*<Route path='/products/:category' element={<Product/>}/>*/}
                    <Route path='/products' element={<ProductList/>}/>
                    <Route path='/reviews/:productId' element={<Review/>}/>
                    <Route path='/product-details/:categoryId/:name/:productId' element={<ProductDetails/>}/>
                    <Route path='/cart' element={<Cart/>}/>
                    <Route path='/wishlist' element={<Wishlist/>}/>
                    <Route path='/checkout' element={<Checkout/>}/>
                    <Route path='/payment-success/:orderId' element={<PaymentSuccess/>}/>
                    <Route path='/account/*' element={<Account/>}/>
                    <Route path='/become-seller' element={<BecomeSeller/>}/>
                    <Route path='/seller/*' element={<SellerDashboard/>}/>
                    <Route path='/admin/*' element={<AdminDashboard/>}/>
                </Routes>
                {!hideFooter && <Footer/>}
                {!location.pathname.startsWith('/admin') && !location.pathname.startsWith('/seller') && !location.pathname.startsWith('/login') && <Chatbot />}
            </div>
        </ThemeProvider>
    );
}

export default App;
