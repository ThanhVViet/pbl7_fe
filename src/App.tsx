import React from 'react';
import './App.css';
import Navbar from "./customer/components/Navbar";
import {ThemeProvider} from "@mui/material";
import customTheme from "./theme/customTheme";
import Home from "./customer/pages/Home/Home";

function App() {
  return (
        <ThemeProvider theme={customTheme} >
            <div>
                <Navbar />
                <Home/>
            </div>
        </ThemeProvider>
  );
}

export default App;
