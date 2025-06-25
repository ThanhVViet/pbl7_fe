import React from 'react';
import {motion} from "framer-motion";
import OrderMonthlyChart from "../Dashboard/OrderMonthlyChart";
import AdminRoutes from "../../../routes/AdminRoutes";

const contentVariants = {
    hidden: {opacity: 0, x: 20},
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

const OrderStat = () => {
    return (
        <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 0.5}}
        >
            <div className='lg:flex lg:h-[100vh]'>

                <motion.section
                    className='p-10 w-full lg:w-[100%] overflow-y-auto'
                    variants={contentVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <OrderMonthlyChart/>
                </motion.section>
            </div>
        </motion.div>
    );
};

export default OrderStat;
