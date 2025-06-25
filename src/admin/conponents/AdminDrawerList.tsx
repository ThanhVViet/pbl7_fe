import React from 'react';
import DrawerList from "../../components/DrawerList";
import {
    AccountBox,
    Add, Category,
    Dashboard, ElectricBolt, Home, IntegrationInstructions,
    LocalOffer,
    Logout, People, ShoppingBag,
    Receipt,
} from "@mui/icons-material";

const menu = [
    {
        name: 'Trang chủ',
        icon: <Dashboard className='text-primary-color'/>,
        activeIcon: <Dashboard className='text-white'/>,
        path: '/admin'
    },
    {
        name: 'Đơn hàng',
        icon: <ShoppingBag className='text-primary-color'/>,
        activeIcon: <ShoppingBag className='text-white'/>,
        path: '/admin/orders'
    },
    {
        name: 'Sản phẩm',
        icon: <LocalOffer className='text-primary-color'/>,
        activeIcon: <LocalOffer className='text-white'/>,
        path: '/admin/products'
    },
    // {
    //     name: 'Coupons',
    //     icon: <IntegrationInstructions className='text-primary-color'/>,
    //     activeIcon: <IntegrationInstructions className='text-white'/>,
    //     path: '/admin/coupon'
    // },
    // {
    //     name: 'Home Page',
    //     icon: <Home className='text-primary-color'/>,
    //     activeIcon: <Home className='text-white'/>,
    //     path: '/admin/home-grid'
    // },
    // {
    //     name: 'Add New Coupon',
    //     icon: <Add className='text-primary-color'/>,
    //     activeIcon: <Add className='text-white'/>,
    //     path: '/admin/add-coupon'
    // },
    {
        name: 'Người dùng',
        icon: <People className='text-primary-color'/>,
        activeIcon: <People className='text-white'/>,
        path: '/admin/users'
    },
    {
        name: 'Danh mục',
        icon: <Category className='text-primary-color'/>,
        activeIcon: <Category className='text-white'/>,
        path: '/admin/category'
    },
    {
        name: 'Giao dịch',
        icon: <Receipt className='text-primary-color'/>,
        activeIcon: <Receipt className='text-white'/>,
        path: '/admin/transaction'
    },
]

const menu2 = [
    {
        name: 'Tài khoản',
        icon: <AccountBox className='text-primary-color'/>,
        activeIcon: <AccountBox className='text-white'/>,
        path: '/admin/account'
    },
    {
        name: 'Đăng xuất',
        icon: <Logout className='text-primary-color'/>,
        activeIcon: <Logout className='text-white'/>,
        path: '/'
    },
]

const AdminDrawerList = ({toggleDrawer}: any) => {
    return (
        <DrawerList menu={menu} menu2={menu2} toggleDrawer={toggleDrawer}/>

    );
};

export default AdminDrawerList;
