import React, {useEffect, useState} from 'react';
import {
    Box,
    Button,
    CircularProgress,
    FormControl,
    FormHelperText,
    Grid2,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    TextField
} from "@mui/material";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import {useFormik} from "formik";
import {uploadToCloudinay} from "../../../utils/uploadToCloudinay";
import {Close} from "@mui/icons-material";
import {colors} from "../../../data/filter/colors";
import {useAppDispatch, useAppSelector} from "../../../state/store";
import {useNavigate, useParams} from "react-router-dom";
import {homeCategories} from "../../../data/homeCategories";
import {fetchProductById} from "../../../state/customer/ProductSlice";
import {updateProduct} from "../../../state/admin/ProductSlice";
import {getAllInventory} from "../../../state/admin/InventorySlice";
import {brand} from "../../../data/brand";
import {toast} from "sonner";


const ProductDetails = () => {
    const {productId} = useParams();
    const dispatch = useAppDispatch();
    const {product} = useAppSelector(state => state.product);
    const [uploadImage, setUploadImage] = useState(false);
    const navigate = useNavigate();
    const {inventory} = useAppSelector(store => store.inventory)


    useEffect(() => {
        if (productId) {
            dispatch(fetchProductById({productId: Number(productId), jwt: localStorage.getItem('jwt') || ''}))
        }
        dispatch(getAllInventory())
    }, [productId, dispatch]);

    const formik = useFormik({
        initialValues: {
            title: product?.title || '',
            brand: product?.brand || '',
            description: product?.description || '',
            sellingPrice: product?.sellingPrice || '',
            quantity: inventory?.find((item: any) => item.productId === Number(productId))?.quantity || '',
            color: product?.color || '',
            images: product?.images || [],
            categoryId: product?.categoryId || '',
            specs: typeof product?.specs === 'object' && product.specs !== null
                        ? JSON.stringify(product.specs, null, 2)
                        : product?.specs || '',
        },
        enableReinitialize: true,
        onSubmit: (values) => {
            if (productId) {
                let specsObj;
                if (values.specs) {
                    try {
                        specsObj = JSON.parse(values.specs);
                    } catch (e) {
                        toast.error('Specs phải là JSON hợp lệ!');
                        return;
                    }
                }
                const request = {
                    ...values,
                    quantity: Number(values.quantity),
                    specs: specsObj,
                };
                console.log('update request:', request);
                dispatch(updateProduct({
                    productId: Number(productId),
                    request,
                    jwt: localStorage.getItem('jwt')
                }));
            }
            navigate("/admin/products")

        }
    });

    const handleImageChange = async (e: any) => {
        const files = Array.from(e.target.files);
        setUploadImage(true);

        const uploadPromises = files.map(async (file: any) => {
            return await uploadToCloudinay(file);
        });

        const uploadedImages = await Promise.all(uploadPromises);

        formik.setFieldValue("images", [...formik.values.images, ...uploadedImages]);
        setUploadImage(false);
    };

    const handleRemoveImage = (index: number) => {
        const updatedImages = [...formik.values.images];
        updatedImages.splice(index, 1);
        formik.setFieldValue("images", updatedImages);
    };

    return (
        <div>
            <form className='space-y-4 p-4' onSubmit={formik.handleSubmit}>

                <Grid2 container spacing={2}>
                    <Grid2 size={{xs: 12}} className='flex flex-row items-start gap-3'>
                        <input
                            type='file'
                            accept='image/*'
                            id='fileInput'
                            style={{display: "none"}}
                            onChange={handleImageChange}
                            multiple
                        />
                        <label htmlFor='fileInput' className='relative w-32 h-32 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-100 hover:bg-gray-200 transition'>
                            <AddPhotoAlternateIcon className='text-gray-400 text-4xl' />
                            {uploadImage && (
                                <div className='absolute inset-0 flex items-center justify-center bg-white/70 rounded-lg'>
                                    <CircularProgress />
                                </div>
                            )}
                        </label>
                        <div className='flex flex-row gap-3 overflow-x-auto'>
                            {formik.values.images.map((image, index) => (
                                <div className='relative group' key={index}>
                                    <img className='w-32 h-32 object-cover rounded-lg border' src={image} alt='' />
                                    <IconButton onClick={() => handleRemoveImage(index)} size='small' color='error' className='!absolute top-0 right-0 bg-white/80 group-hover:bg-white'>
                                        <Close sx={{ fontSize: "1rem" }} />
                                    </IconButton>
                                </div>
                            ))}
                        </div>
                    </Grid2>

                    <Grid2 size={{xs: 12, lg: 6}}>
                        <TextField
                            fullWidth
                            id='title'
                            name='title'
                            label='Tên sản phẩm'
                            value={formik.values.title}
                            onChange={formik.handleChange}
                            error={formik.touched.title && Boolean(formik.errors.title)}
                            helperText={formik.touched.title && formik.errors.title}
                            required
                        />
                    </Grid2>
                    <Grid2 size={{xs: 12, md: 4, lg: 6}}>
                        <FormControl fullWidth
                                     error={formik.touched.brand && Boolean(formik.errors.brand)}
                                     required
                        >
                            <InputLabel id='brand-label'>
                                Nhãn hàng
                            </InputLabel>
                            <Select labelId='brand-label' id='brand' name='brand'
                                    value={formik.values.brand}
                                    onChange={formik.handleChange}
                                    label='Nhãn hàng'
                            >
                                {
                                    brand.map((item, index) => (
                                        <MenuItem key={index} value={item.id}>
                                            {
                                                item.name
                                            }
                                        </MenuItem>
                                    ))
                                }
                            </Select>
                            {
                                formik.touched.brand && formik.errors.brand && (
                                    <FormHelperText>{formik.errors.brand}</FormHelperText>
                                )
                            }

                        </FormControl>
                    </Grid2>


                    <Grid2 size={{xs: 12, md: 4, lg: 3}}>
                        <TextField
                            fullWidth
                            id='sellingPrice'
                            name='sellingPrice'
                            label='Giá của sản phẩm'
                            value={formik.values.sellingPrice}
                            type='number'
                            onChange={formik.handleChange}
                            error={formik.touched.sellingPrice && Boolean(formik.errors.sellingPrice)}
                            helperText={formik.touched.sellingPrice && formik.errors.sellingPrice}
                            required
                        />
                    </Grid2>

                    <Grid2 size={{xs: 12, md: 4, lg: 3}}>
                        <TextField
                            fullWidth
                            id='quantity'
                            name='quantity'
                            label='Số lượng'
                            value={formik.values.quantity}
                            type='number'
                            onChange={formik.handleChange}
                            error={formik.touched.quantity && Boolean(formik.errors.quantity)}
                            helperText={
                                formik.touched.quantity && typeof formik.errors.quantity === 'string'
                                    ? formik.errors.quantity
                                    : ''
                            }
                            required
                        />
                    </Grid2>

                    <Grid2 size={{xs: 12, md: 4, lg: 3}}>
                        <FormControl fullWidth error={formik.touched.color && Boolean(formik.errors.color)} required>
                            <InputLabel id='color-label'>Màu sản phẩm</InputLabel>
                            <Select
                                labelId='color-label'
                                id='color'
                                name='color'
                                value={formik.values.color || ""}
                                onChange={formik.handleChange}
                                label='Màu sản phẩm'
                            >
                                <MenuItem value=''>
                                    <em>None</em>
                                </MenuItem>
                                {
                                    colors.map((color, index) => (
                                        <MenuItem key={index} value={color.name}>
                                            <div className='flex gap-3'>
                                                <span style={{backgroundColor: color.hex}}
                                                      className={`h-5 w-5 rounded-full ${color.name === "White" ? "border" : ""}`}/>
                                                <p>{color.name}</p>
                                            </div>
                                        </MenuItem>
                                    ))
                                }
                            </Select>
                            {
                                formik.touched.color && formik.errors.color && (
                                    <FormHelperText>{formik.errors.color}</FormHelperText>
                                )
                            }
                        </FormControl>
                    </Grid2>

                    <Grid2 size={{xs: 12, md: 4, lg: 3}}>
                        <FormControl fullWidth error={formik.touched.categoryId && Boolean(formik.errors.categoryId)}
                                     required>
                            <InputLabel id='category-label'>Loại sản phẩm</InputLabel>
                            <Select
                                labelId='category-label'
                                id='category'
                                name='categoryId'
                                value={formik.values.categoryId}
                                onChange={formik.handleChange}
                                label='Loại sản phẩm'
                            >
                                {
                                    homeCategories.map((item, index) => (
                                        <MenuItem key={index} value={item.categoryId}>
                                            {item.name}
                                        </MenuItem>
                                    ))
                                }
                            </Select>
                            {
                                formik.touched.categoryId && formik.errors.categoryId && (
                                    <FormHelperText>{formik.errors.categoryId}</FormHelperText>
                                )
                            }
                        </FormControl>
                    </Grid2>

                    <Grid2 size={{xs: 12}}>
                        <TextField multiline rows={8} fullWidth id='description' name='description'
                                   label='Mô tả về sản phẩm'
                                   value={formik.values.description}
                                   onChange={formik.handleChange}
                                   error={formik.touched.description && Boolean(formik.errors.description)}
                                   helperText={formik.touched.description && formik.errors.description}
                                   required
                        />
                        <div style={{ marginTop: 32 }} />
                        <TextField multiline rows={6} fullWidth id='specs' name='specs'
                                   label='Thông số kỹ thuật (JSON)'
                                   value={formik.values.specs || ''}
                                   onChange={formik.handleChange}
                                   error={formik.touched.specs && Boolean(formik.errors.specs)}
                                   helperText='Nhập thông số kỹ thuật dạng JSON, ví dụ: {"CPU": "...", "Ram": "..."}'
                        />
                    </Grid2>


                    <Grid2 size={{xs: 12}}>
                        <Button sx={{p: "14px"}} color='primary' variant='contained' fullWidth
                                onClick={() => formik.handleSubmit()}>
                            Cập nhật sản phẩm
                        </Button>
                    </Grid2>


                </Grid2>

            </form>

        </div>
    );
};

export default ProductDetails;
