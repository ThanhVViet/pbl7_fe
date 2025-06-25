import React, {useEffect, useState} from 'react';
import UserAddressCard from "./UserAddressCard";
import {Box, Button, Modal, CircularProgress, Typography} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../../state/store";
import {fetchUserAddress, fetchAddressById, deleteAddress} from '../../../state/customer/OrderSlice';
import AddressForm from "../Checkout/AddressForm";
import {updateAddress} from '../../../state/customer/OrderSlice';
import DeleteAddressModal from './DeleteAddressModal';
import { toast } from 'react-toastify';
import type { Address as AddressType } from '../../../types/UserType';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

const AddressList = () => {
    const [openAdd, setOpenAdd] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [editingAddress, setEditingAddress] = useState<number | null>(null);
    const [deletingAddress, setDeletingAddress] = useState<AddressType | null>(null);
    const [loadingEdit, setLoadingEdit] = useState(false);

    const {addresses, address, loading} = useAppSelector(state => state.order);
    const {auth} = useAppSelector(state => state);
    const dispatch = useAppDispatch();

    const handleEdit = async (item: AddressType) => {
        setLoadingEdit(true);
        await dispatch(fetchAddressById({ jwt: auth.jwt as string, addressId: item.id as number }));
        setEditingAddress(item.id as number);
        setLoadingEdit(false);
        setOpenEdit(true);
    };

    const handleDelete = (item: AddressType) => {
        setDeletingAddress(item);
        setOpenDelete(true);
    };

    const handleConfirmDelete = async () => {
        if (deletingAddress?.id) {
            try {
                await dispatch(deleteAddress({ 
                    addressId: deletingAddress.id, 
                    jwt: auth.jwt as string 
                }));
                toast.success('Đã xoá địa chỉ thành công!');
                dispatch(fetchUserAddress(auth.jwt as string));
            } catch (error) {
                toast.error('Xoá địa chỉ thất bại!');
            }
        }
        setOpenDelete(false);
        setDeletingAddress(null);
    };

    const handleUpdateAddress = async (values: any) => {
        if (!editingAddress) return;
        await dispatch(updateAddress({ addressId: editingAddress, deliveryAddress: values, jwt: auth.jwt as string }));
        setOpenEdit(false);
        await dispatch(fetchUserAddress(auth.jwt as string));
    };

    useEffect(() => {
        dispatch(fetchUserAddress(auth.jwt || ''));
    }, [auth.jwt]);

    return (
        <>
            <div className='space-y-3'>
                <Box sx={{display: 'flex', justifyContent: 'flex-end', mb: 2}}>
                    <Button variant="contained" color="primary" onClick={() => setOpenAdd(true)}>
                        THÊM ĐỊA CHỈ
                    </Button>
                </Box>
                {loading ? (
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 5 }}>
                        <CircularProgress color="primary" />
                        <Typography sx={{ mt: 2 }}>Đang tải danh sách địa chỉ...</Typography>
                    </Box>
                ) : (
                    addresses?.map((item, idx) => (
                        <UserAddressCard
                            key={idx}
                            item={item}
                            onEdit={() => handleEdit(item)}
                            onDelete={() => handleDelete(item)}
                        />
                    ))
                )}
            </div>

            {/* Modal Thêm địa chỉ */}
            <Modal
                open={openAdd}
                onClose={() => setOpenAdd(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <AddressForm handleClose={() => setOpenAdd(false)} />
                </Box>
            </Modal>

            {/* Modal Sửa địa chỉ */}
            <Modal
                open={openEdit}
                onClose={() => setOpenEdit(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {loadingEdit ? (
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 5 }}>
                            <CircularProgress color="primary" />
                            <Typography sx={{ mt: 2 }}>Đang tải thông tin địa chỉ...</Typography>
                        </Box>
                    ) : (
                        <AddressForm 
                            handleClose={() => setOpenEdit(false)}
                            initialValues={address}
                            isEdit={true}
                            onUpdate={handleUpdateAddress}
                        />
                    )}
                </Box>
            </Modal>

            {/* Modal Xác nhận xoá địa chỉ */}
            <DeleteAddressModal
                open={openDelete}
                onClose={() => setOpenDelete(false)}
                onConfirm={handleConfirmDelete}
            />
        </>
    );
};

export default AddressList;