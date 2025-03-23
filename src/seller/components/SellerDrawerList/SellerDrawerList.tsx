import React from 'react';
import {
    AccountBalanceWallet,
    AccountBox,
    Add,
    Dashboard,
    Inventory,
    Logout,
    Receipt,
    ShoppingBag
} from "@mui/icons-material";
import DrawerList from "../../../components/DrawerList";

const menu = [
    {
        name: 'Dashboard',
        icon: <Dashboard className='text-primary-color'/>,
        activeIcon: <Dashboard className='text-white'/>,
        path: '/seller'
    },
    {
        name: 'Orders',
        icon: <ShoppingBag className='text-primary-color'/>,
        activeIcon: <ShoppingBag className='text-white'/>,
        path: '/seller/orders'
    },
    {
        name: 'Products',
        icon: <Inventory className='text-primary-color'/>,
        activeIcon: <Inventory className='text-white'/>,
        path: '/seller/products'
    },

    {
        name: 'Add Product',
        icon: <Add className='text-primary-color'/>,
        activeIcon: <Add className='text-white'/>,
        path: '/seller/add-product'
    },

    {
        name: 'Payment',
        icon: <AccountBalanceWallet className='text-primary-color'/>,
        activeIcon: <AccountBalanceWallet className='text-white'/>,
        path: '/seller/payment'
    },
    {
        name: 'Transaction',
        icon: <Receipt className='text-primary-color'/>,
        activeIcon: <Receipt className='text-white'/>,
        path: '/seller/transaction'
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

const SellerDrawerList = ({toggleDrawer}: {toggleDrawer: any}) => {
    return (

            <DrawerList menu={menu} menu2={menu2} toggleDrawer={toggleDrawer}/>

    );
};

export default SellerDrawerList;
