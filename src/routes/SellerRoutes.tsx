import React from 'react';
import {Route, Routes} from "react-router-dom";
import Dashboard from "../seller/pages/SellerDashboard/Dashboard";

import Orders from "../seller/pages/Order/Orders";
import Profile from "../seller/pages/Account/Profile";

const SellerRoutes = () => {
    return (
        <div>
            <Routes>
                <Route path='/' element={<Dashboard />}/>

                <Route path='/orders' element={<Orders />}/>
                <Route path='/account' element={<Profile />}/>
            </Routes>
        </div>
    );
};

export default SellerRoutes;
