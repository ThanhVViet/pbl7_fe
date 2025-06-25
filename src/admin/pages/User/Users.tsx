import React from 'react';
import {useNavigate} from "react-router-dom";
import {Button} from "@mui/material";
import UserTable from "./UserTable";
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

const Users = () => {
    const navigate = useNavigate();

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.div 
                className='flex justify-between items-center pb-5'
                variants={itemVariants}
            >
                <motion.h1 
                    className='font-bold mb-5 text-xl'
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                >
                    Danh sách người dùng
                </motion.h1>
                {/*<motion.div*/}
                {/*    whileHover={{ scale: 1.05 }}*/}
                {/*    whileTap={{ scale: 0.95 }}*/}
                {/*>*/}
                {/*    <Button */}
                {/*        variant='contained' */}
                {/*        onClick={() => navigate('/admin/products/add-product')}*/}
                {/*    >*/}
                {/*        Thêm người dùng*/}
                {/*    </Button>*/}
                {/*</motion.div>*/}
            </motion.div>
            
            <motion.div
                variants={itemVariants}
            >
                <UserTable/>
            </motion.div>
        </motion.div>
    );
};

export default Users;
