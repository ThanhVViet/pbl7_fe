import React from 'react';
import OrderTable from "./OrderTable";
import { motion } from 'framer-motion';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            when: "beforeChildren",
            staggerChildren: 0.2
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring" as "spring",
            stiffness: 100,
            damping: 20
        }
    }
};

const Orders = () => {
    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/*<motion.h1 */}
            {/*    className='font-bold mb-5 text-xl'*/}
            {/*    variants={itemVariants}*/}
            {/*    whileHover={{ scale: 1.02 }}*/}
            {/*    transition={{ type: "spring", stiffness: 300 }}*/}
            {/*>*/}
            {/*    Danh sách đơn hàng*/}
            {/*</motion.h1>*/}
            
            <motion.div
                variants={itemVariants}
            >
                <OrderTable />
            </motion.div>
        </motion.div>
    );
};

export default Orders;
