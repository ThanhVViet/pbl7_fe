import React, {useEffect} from 'react';

import AdminDrawerList from "../../conponents/AdminDrawerList";
import AdminRoutes from "../../../routes/AdminRoutes";
import {useAppDispatch} from "../../../state/store";
import {fetchHomeCategories} from "../../../state/admin/AdminSlice";

const AdminDashboard = () => {

    const dispatch = useAppDispatch()
    const toggleDrawer = () => {
    }

    useEffect(() => {
        dispatch(fetchHomeCategories())
    }, []);

    return (
        <div>
            <div className='lg:flex lg:h-[90vh]'>
                <section className='hidden lg:block h-full'>
                    <AdminDrawerList toggleDrawer={toggleDrawer}/>

                </section>

                <section className='p-10 w-full lg:w-[80%] overflow-y-auto'>
                    <AdminRoutes />
                </section>
            </div>
        </div>
    );
};

export default AdminDashboard;
