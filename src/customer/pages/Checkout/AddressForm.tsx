import React, { useEffect, useState } from 'react';
import { Box, Button, Grid2, TextField, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { useAppDispatch } from "../../../state/store";
import { createAddress } from "../../../state/customer/OrderSlice";

import provincesDataRaw from '../../../data/address/tinh_tp.json';
import districtsDataRaw from '../../../data/address/quan_huyen.json';
import wardsDataRaw from '../../../data/address/xa_phuong.json';

const provincesData: any = provincesDataRaw;
const districtsData: any = districtsDataRaw;
const wardsData: any = wardsDataRaw;

const AddressFormScheme = Yup.object().shape({
    name: Yup.string().required("Họ và tên là bắt buộc"),
    mobile: Yup.string().required("Số điện thoại là bắt buộc"),
    address: Yup.string().required("Địa chỉ chi tiết là bắt buộc"),
    city: Yup.string().required("Thành phố là bắt buộc"),
    state: Yup.string().required("Quận/Huyện là bắt buộc"),
    locality: Yup.string().required("Phường/Xã là bắt buộc")
});

interface AddressFormProps {
    handleClose: any;
    initialValues?: any;
    isEdit?: boolean;
    onUpdate?: (values: any) => void;
}

const AddressForm = ({ handleClose, initialValues, isEdit, onUpdate }: AddressFormProps) => {
    const dispatch = useAppDispatch();

    // State cho select
    const [selectedProvince, setSelectedProvince] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedWard, setSelectedWard] = useState('');
    const [districts, setDistricts] = useState<any[]>([]);
    const [wards, setWards] = useState<any[]>([]);

    // Chuyển object sang array
    const provinces = Object.values(provincesData);
    const allDistricts = Object.values(districtsData);
    const allWards = Object.values(wardsData);

    const formik = useFormik({
        initialValues: initialValues || {
            name: '',
            mobile: '',
            address: '',
            city: '',
            state: '',
            locality: ''
        },
        enableReinitialize: true,
        // validationSchema: AddressFormScheme,
        onSubmit: (values) => {
            // Đồng bộ lại city, state, locality theo dropdown đang chọn
            if (selectedProvince) {
                values.city = (provincesData as any)[selectedProvince]?.name || values.city;
            }
            if (selectedDistrict) {
                values.state = (districtsData as any)[selectedDistrict]?.name || values.state;
            }
            if (selectedWard) {
                values.locality = (wardsData as any)[selectedWard]?.name || values.locality;
            }
            if (isEdit && onUpdate) {
                onUpdate(values);
            } else {
                if (formik.isValid) {
                    dispatch(createAddress({
                        deliveryAddress: values,
                        jwt: localStorage.getItem('jwt') || '',
                    }));
                }
            }
            handleClose();
        }
    });

    // Khi chọn tỉnh/thành phố
    useEffect(() => {
        // Nếu đang khởi tạo từ initialValues thì không reset
        if (selectedProvince && !initialValues) {
            const filteredDistricts = allDistricts.filter((d: any) => d.parent_code === selectedProvince);
            setDistricts(filteredDistricts);
            setSelectedDistrict('');
            setWards([]);
            setSelectedWard('');
            formik.setFieldValue('city', (provincesData as any)[selectedProvince].name);
            formik.setFieldValue('state', '');
            formik.setFieldValue('locality', '');
        } else if (selectedProvince) {
            const filteredDistricts = allDistricts.filter((d: any) => d.parent_code === selectedProvince);
            setDistricts(filteredDistricts);
        }
    }, [selectedProvince]);

    // Khi chọn quận/huyện
    useEffect(() => {
        if (selectedDistrict && !initialValues) {
            const filteredWards = allWards.filter((w: any) => w.parent_code === selectedDistrict);
            setWards(filteredWards);
            setSelectedWard('');
            formik.setFieldValue('state', (districtsData as any)[selectedDistrict].name);
            formik.setFieldValue('locality', '');
        } else if (selectedDistrict) {
            const filteredWards = allWards.filter((w: any) => w.parent_code === selectedDistrict);
            setWards(filteredWards);
        }
    }, [selectedDistrict]);

    // Khi chọn phường/xã
    useEffect(() => {
        if (selectedWard) {
            formik.setFieldValue('locality', (wardsData as any)[selectedWard].name);
        }
    }, [selectedWard]);

    useEffect(() => {
        if (initialValues) {
            const provinceCode = (provinces.find((p: any) => p.name === initialValues.city) as any)?.code || '';
            setSelectedProvince(provinceCode);

            // Lọc quận/huyện theo provinceCode
            const filteredDistricts = allDistricts.filter((d: any) => d.parent_code === provinceCode);
            setDistricts(filteredDistricts);

            const districtCodeInit = (filteredDistricts.find((d: any) => d.name === initialValues.state) as any)?.code || '';
            setSelectedDistrict(districtCodeInit);

            // Lọc phường/xã theo districtCode
            const filteredWards = allWards.filter((w: any) => w.parent_code === districtCodeInit);
            setWards(filteredWards);

            const wardCode = (filteredWards.find((w: any) => w.name === initialValues.locality) as any)?.code || '';
            setSelectedWard(wardCode);
        }
    }, [initialValues]);

    return (
        <Box sx={{ max: "auto" }}>
            <p className='text-xl font-bold text-center pb-5'>Thông tin liên hệ</p>
            <form onSubmit={formik.handleSubmit}>
                <Grid2 container spacing={4}>
                    <Grid2 size={{ xs: 12 }}>
                        <TextField
                            fullWidth
                            name='name'
                            label='Họ và tên'
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && typeof formik.errors.name === 'string' ? formik.errors.name : undefined}
                        />
                    </Grid2>
                    <Grid2 size={{ xs: 12 }}>
                        <TextField
                            fullWidth
                            name='mobile'
                            label='Số điện thoại'
                            value={formik.values.mobile}
                            onChange={formik.handleChange}
                            error={formik.touched.mobile && Boolean(formik.errors.mobile)}
                            helperText={formik.touched.mobile && typeof formik.errors.mobile === 'string' ? formik.errors.mobile : undefined}
                        />
                    </Grid2>
                    <Grid2 size={{ xs: 12 }}>
                        <TextField
                            fullWidth
                            name='address'
                            label='Địa chỉ chi tiết'
                            value={formik.values.address}
                            onChange={formik.handleChange}
                            error={formik.touched.address && Boolean(formik.errors.address)}
                            helperText={formik.touched.address && typeof formik.errors.address === 'string' ? formik.errors.address : undefined}
                        />
                    </Grid2>
                    <Grid2 size={{ xs: 12 }}>
                        <FormControl fullWidth>
                            <InputLabel>Tỉnh/Thành phố</InputLabel>
                            <Select
                                value={selectedProvince}
                                label="Tỉnh/Thành phố"
                                onChange={e => setSelectedProvince(e.target.value)}
                            >
                                {provinces.map((province: any) => (
                                    <MenuItem key={province.code} value={province.code}>{province.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid2>
                    <Grid2 size={{ xs: 12 }}>
                        <FormControl fullWidth disabled={!selectedProvince}>
                            <InputLabel>Quận/Huyện</InputLabel>
                            <Select
                                value={selectedDistrict}
                                label="Quận/Huyện"
                                onChange={e => setSelectedDistrict(e.target.value)}
                            >
                                {districts.map((district: any) => (
                                    <MenuItem key={district.code} value={district.code}>{district.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid2>
                    <Grid2 size={{ xs: 12 }}>
                        <FormControl fullWidth disabled={!selectedDistrict}>
                            <InputLabel>Phường/Xã</InputLabel>
                            <Select
                                value={selectedWard}
                                label="Phường/Xã"
                                onChange={e => setSelectedWard(e.target.value)}
                            >
                                {wards.map((ward: any) => (
                                    <MenuItem key={ward.code} value={ward.code}>{ward.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid2>
                    <Grid2 size={{ xs: 12 }}>
                        <Button fullWidth sx={{ py: "14px" }} type='submit' variant='contained'>
                            {isEdit ? 'Cập nhật địa chỉ' : 'Thêm địa chỉ'}
                        </Button>
                    </Grid2>
                </Grid2>
            </form>
        </Box>
    );
};

export default AddressForm;
