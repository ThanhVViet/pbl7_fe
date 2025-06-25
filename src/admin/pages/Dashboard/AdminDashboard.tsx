import React, {useEffect} from 'react';
import AdminDrawerList from "../../conponents/AdminDrawerList";
import AdminRoutes from "../../../routes/AdminRoutes";
import {useAppDispatch} from "../../../state/store";
import {fetchHomeCategories} from "../../../state/admin/AdminSlice";
import { motion, AnimatePresence } from 'framer-motion';
import OrderMonthlyChart from './OrderMonthlyChart';
import HomeDashboard from './HomeDashboard';

const sidebarVariants = {
    hidden: { x: -300, opacity: 0 },
    visible: { 
        x: 0, 
        opacity: 1,
        transition: {
            type: "spring" as "spring",
            stiffness: 100,
            damping: 20
        }
    }
};

const contentVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { 
        opacity: 1, 
        x: 0,
        transition: {
            type: "spring" as "spring",
            stiffness: 100,
            damping: 20,
            delay: 0.2
        }
    }
};

const AdminDashboard = () => {
    const dispatch = useAppDispatch();
    const toggleDrawer = () => {
    };

    useEffect(() => {
        dispatch(fetchHomeCategories());
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className='lg:flex lg:h-[90vh]'>
                <AnimatePresence>
                    <motion.section 
                        className='hidden lg:block h-full'
                        variants={sidebarVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <AdminDrawerList toggleDrawer={toggleDrawer}/>
                    </motion.section>
                </AnimatePresence>

                <motion.section 
                    className='p-10 w-full lg:w-[80%] overflow-y-auto'
                    variants={contentVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <AdminRoutes />
                </motion.section>
            </div>
        </motion.div>
    );
};

export default AdminDashboard;
