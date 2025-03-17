import React from 'react';
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

function App() {
  return (
        <ThemeProvider theme={customTheme} >
            <div>
                <Navbar />
                {/*<Home/>*/}
                {/*<Product />*/}
                {/*<ProductDetails />*/}
                {/*<Review />*/}
                {/*<Cart />*/}
                <Checkout/>
            </div>
        </ThemeProvider>
  );
}

export default App;
