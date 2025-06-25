import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./state/store";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    // <React.StrictMode> no render 2 lan
    <React.StrictMode>
        <BrowserRouter>
           <Provider store={store}>
                <App/>
           </Provider>
        </BrowserRouter>
    </React.StrictMode>
);


