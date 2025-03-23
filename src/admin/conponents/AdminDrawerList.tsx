import React from 'react';
import DrawerList from "../../components/DrawerList";
import {
    AccountBox,
    Add, Category,
    Dashboard, ElectricBolt, Home, IntegrationInstructions,
    LocalOffer,
    Logout,
} from "@mui/icons-material";

const menu = [
    {
        name: 'Dashboard',
        icon: <Dashboard className='text-primary-color'/>,
        activeIcon: <Dashboard className='text-white'/>,
        path: '/admin'
    },
    {
        name: 'Coupons',
        icon: <IntegrationInstructions className='text-primary-color'/>,
        activeIcon: <IntegrationInstructions className='text-white'/>,
        path: '/admin/coupon'
    },
    {
        name: 'Home Page',
        icon: <Home className='text-primary-color'/>,
        activeIcon: <Home className='text-white'/>,
        path: '/admin/home-grid'
    },
    {
        name: 'Add New Coupon',
        icon: <Add className='text-primary-color'/>,
        activeIcon: <Add className='text-white'/>,
        path: '/admin/add-coupon'
    },
    {
        name: 'Electronics Category',
        icon: <ElectricBolt className='text-primary-color'/>,
        activeIcon: <ElectricBolt className='text-white'/>,
        path: '/admin/electronics-category'
    },
    {
        name: 'Shop By Category',
        icon: <Category className='text-primary-color'/>,
        activeIcon: <Category className='text-white'/>,
        path: '/admin/shop-by-category'
    },
    {
        name: 'Deals',
        icon: <LocalOffer className='text-primary-color'/>,
        activeIcon: <LocalOffer className='text-white'/>,
        path: '/admin/deals'
    }
]

const menu2 = [
    {
        name: 'Account',
        icon: <AccountBox className='text-primary-color'/>,
        activeIcon: <AccountBox className='text-white'/>,
        path: '/seller/account'
    },
    {
        name: 'Logout',
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
