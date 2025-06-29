import React from 'react';
import {Divider} from "@mui/material";
import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import Order from "./Order";
import OrderDetails from "./OrderDetails";
import UserDetails from "./UserDetails";
import {useAppDispatch, useAppSelector} from "../../../state/store";
import {logout} from "../../../state/AuthSlice";
import AddressList from "./AddressList";

const menu = [
    {name: "Danh sách đơn hàng", path: "/account/orders"},
    {name: "Trang cá nhân", path: "/account"},
    // {name: "saved cards", path: "/account/saved-card"},
    {name: "Danh sách địa chỉ", path: "/account/addresses"},
    {name: "Đăng xuất", path: "/"},
]

const Account = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useAppDispatch()
    const {auth} = useAppSelector(store => store)

    const isActive = (path: string) => {
        if (path === "/account/orders") {
            return location.pathname === "/account/orders" || location.pathname.startsWith("/account/order/");
        }
        return location.pathname === path;
    };

    const handleClick = (item: any) => {
        if (item.path === '/') {
            dispatch(logout())
            navigate('/')
        }
        navigate(item.path)
    }

    return (
        <div className='px-5 lg:px-52 min-h-screen mt-10'>
            <div>
                <h1 className='text-xl font-bold pb-5'>
                    {auth?.user?.username}
                </h1>
            </div>

            <Divider/>

            <div className='grid grid-cols-1 lg:grid-cols-3 lg:min-h-[78vh]'>
                <section className='col-span-1 lg:border-r lg:pr-5 py-5 h-full'>
                    {
                        menu.map((item) => (
                            <div onClick={() => handleClick(item)}
                                 key={item.name}
                                 className={`${isActive(item.path) ? "bg-primary-color text-white" : ""} py-3 cursor-pointer hover:text-white hover:bg-primary-color
                            px-5 rounded-md border-b`}>
                                <p>{item.name}</p>
                            </div>
                        ))
                    }
                </section>

                <section className='right lg:col-span-2 lg:pl-5 py-5'>
                    <Routes>
                        <Route path='/' element={<UserDetails/>}/>
                        <Route path='/orders' element={<Order/>}/>
                        <Route path='/addresses' element={<AddressList/>}/>
                        <Route path='/order/:orderId/:orderItemId' element={<OrderDetails/>}/>
                    </Routes>
                </section>
            </div>
        </div>
    );
};

export default Account;
