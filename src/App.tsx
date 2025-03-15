import React from 'react';
import './App.css';
import Navbar from "./customer/components/Navbar";
import {ThemeProvider} from "@mui/material";
import customTheme from "./theme/customTheme";
import Home from "./customer/pages/Home/Home";
import Product from "./customer/pages/Product/Product";
import ProductDetails from "./customer/pages/Details/ProductDetails";

function App() {
  return (
        <ThemeProvider theme={customTheme} >
            <div>
                <Navbar />
                {/*<Home/>*/}
                {/*<Product />*/}
                <ProductDetails />
            </div>
        </ThemeProvider>
  );
}

export default App;
