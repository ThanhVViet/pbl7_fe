import React from 'react';
import {Dashboard} from "@mui/icons-material";

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
    return (
        <div className='h-full'>
            <div className='flex flex-col justify-between h-full w-[300px] border-r py-5'>
                <div>
                    <div className='space-y-2'>
                        {
                            menu.map((item, index) => (
                                <div key={index}>
                                    <p></p>
                                </div>
                            ))
                        }

                    </div>
                </div>
            </div>
        </div>
    );
};

export default DrawerList;
