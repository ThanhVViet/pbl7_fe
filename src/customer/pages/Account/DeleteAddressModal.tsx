import React from 'react';
import { AnimatePresence, motion } from "framer-motion";
import DeleteIcon from '@mui/icons-material/Delete';

const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
};

const modalVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { type: "spring" as "spring", stiffness: 300, damping: 25 } },
    exit: { scale: 0.8, opacity: 0 }
};

interface DeleteAddressModalProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const DeleteAddressModal = ({ open, onClose, onConfirm }: DeleteAddressModalProps) => {
    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={backdropVariants}
                    onClick={onClose}
                >
                    <motion.div
                        className="bg-white text-center p-6 rounded-lg shadow-lg w-80 relative"
                        variants={modalVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        onClick={e => e.stopPropagation()}
                    >
                        <DeleteIcon 
                            sx={{ 
                                fontSize: 56,
                                color: 'rgb(239, 68, 68)',
                                display: 'block',
                                margin: '0 auto'
                            }} 
                        />
                        <div className="mx-auto my-4 w-60">
                            <h3 className="text-lg font-black text-gray-800">
                                Xác nhận xoá địa chỉ
                            </h3>
                            <p className="text-sm text-gray-600">
                                Bạn có chắc chắn muốn xoá địa chỉ này không? Hành động này không thể hoàn tác.
                            </p>
                        </div>
                        <div className="flex gap-4 mt-6">
                            <button
                                className="flex-1 text-white bg-gradient-to-r from-red-500 to-red-700 shadow-md shadow-red-400/40 hover:from-red-600 hover:to-red-800 py-2 rounded-md transition duration-150"
                                onClick={onConfirm}
                            >
                                Xoá
                            </button>
                            <button
                                className="flex-1 bg-gray-200 text-gray-600 hover:bg-gray-300 py-2 rounded-md transition duration-150"
                                onClick={onClose}
                            >
                                Huỷ
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default DeleteAddressModal; 