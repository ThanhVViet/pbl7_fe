import React from 'react';
import {Dashboard} from "@mui/icons-material";
import {Divider, ListItemIcon, ListItemText} from "@mui/material";
import {useLocation, useNavigate} from "react-router-dom";
import {useAppDispatch} from "../state/store";
import {logout} from "../state/AuthSlice";

interface MenuItem {
    name: string,
    icon: any,
    activeIcon: any,
    path: string
}

interface DrawerListProps {
    menu: MenuItem[],
    menu2: MenuItem[],
    toggleDrawer: () => {}
}

const DrawerList = ({menu, menu2, toggleDrawer}: DrawerListProps) => {
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const handleLogout = () => {
        dispatch(logout())
        navigate('/')
    }

    return (
        <div className='h-full'>
            <div className='flex flex-col justify-between h-full w-[300px] border-r py-5'>
                <div className='space-y-2'>
                    {menu.map((item, index) => {
                        let isActive = false;
                        if (item.path === '/admin') {
                            isActive = location.pathname === '/admin';
                        } else if (item.path === '/admin/category') {
                            isActive = location.pathname === '/admin/category' || location.pathname === '/admin/add-category';
                        } else {
                            isActive = location.pathname.startsWith(item.path);
                        }

                        return (
                            <div
                                onClick={() => {
                                    if (item.path === '/') {
                                        handleLogout();
                                    } else {
                                        navigate(item.path);
                                    }
                                }}
                                className="pr-9 cursor-pointer"
                                key={index}
                            >
                                <p
                                    className={`${
                                        isActive ? "bg-primary-color text-white" : "text-primary-color"
                                    } flex items-center px-5 py-3 rounded-r-full`}
                                >
                                    <ListItemIcon>
                                        {isActive ? item.activeIcon : item.icon}
                                    </ListItemIcon>

                                    <ListItemText primary={item.name}/>
                                </p>
                            </div>
                        );
                    })}


                </div>

                <Divider/>

                <div className='space-y-2'>
                    {
                        menu2.map((item, index) => (
                            <div onClick={() => navigate(item.path)} className='pr-9 cursor-pointer' key={index}>
                                <p className={`${item.path === location.pathname ? "bg-primary-color text-white" : "text-primary-color"}
                                    flex items-center px-5 py-3 rounded-r-full`}>
                                    <ListItemIcon>
                                        {item.path === location.pathname ? item.activeIcon : item.icon}
                                    </ListItemIcon>

                                    <ListItemText primary={item.name}/>
                                </p>
                            </div>
                        ))
                    }

                </div>
            </div>
        </div>
    );
};

export default DrawerList;
