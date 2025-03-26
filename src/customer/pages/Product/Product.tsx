import React, {useEffect, useState} from 'react';
import FilterSection from "./FilterSection";
import ProductCard from "./ProductCard";
import {
    Box,
    Divider,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem, Pagination,
    Select,
    useMediaQuery,
    useTheme
} from "@mui/material";
import {FilterAlt} from "@mui/icons-material";
import store, {useAppDispatch, useAppSelector} from "../../../state/store";
import {getAllProduct} from "../../../state/customer/ProductSlice";
import {useParams, useSearchParams} from "react-router-dom";

const Product = () => {

    const theme = useTheme()
    const isLarge = useMediaQuery(theme.breakpoints.up("lg"))
    const [sort, setSort] = useState()
    const [page, setPage] = useState(1)
    const dispatch = useAppDispatch()
    const [searchParam, setSearchParam] = useSearchParams()
    const {category} = useParams()
    const {product} = useAppSelector(store => store)


    const handleSortChange = (event: any) => {
        setSort(event.target.value);
    }
    const handelPageChange = (value: number) => {
        setPage(value)
    }

    useEffect(() => {
        const [minPrice, maxPrice] = searchParam.get('price')?.split('-') || []
        const color = searchParam.get('color')
        const minDiscount = searchParam.get('discount')? Number(searchParam.get('discount')): undefined

        const  pageNumber = page - 1

        const newFilter = {
            color: color || '',
            minPrice: minPrice ? Number(minPrice) : undefined,
            maxPrice: maxPrice ? Number(maxPrice) : undefined,
            minDiscount,
            pageNumber
        }

        console.log(newFilter)

        dispatch(getAllProduct(newFilter))
    }, [category, searchParam]);


    return (
        <div className='-z-10 mt-10'>
            <div>
                <h1 className='text-3xl text-center font-semibold text-gray-700 pb-5 px-9 uppercase
                space-x-2'></h1>
            </div>

            <div className='lg:flex '>
                <section className='filter_section hidden lg:block w-[20%]'>
                    <FilterSection/>
                </section>
                <div className='w-full lg:w-[80%] space-y-5'>
                    <div className='flex items-center justify-between px-9 h-[40px]'>
                        <div className='relative w-[50%]'>

                            {
                                !isLarge && (
                                    <IconButton>
                                        <FilterAlt/>
                                    </IconButton>
                                )
                            }

                            {
                                !isLarge && (
                                    <Box>
                                        <FilterSection/>
                                    </Box>
                                )
                            }


                        </div>


                        <FormControl sx={{width: "200px"}} size='small'>
                            <InputLabel id="demo-simple-select-label">Sort</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={sort}
                                label="Price"
                                onChange={handleSortChange}
                            >
                                <MenuItem value={"price_low"}>Price: Low - High</MenuItem>
                                <MenuItem value={"price_high"}>Price: High - Low</MenuItem>
                            </Select>
                        </FormControl>


                    </div>
                    <Divider/>
                    <section className='products_section grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-5 px-5
                     justify-center'>
                        {product?.products?.map((item, index) => <ProductCard key={index} item = {item}/>)}
                    </section>
                    <div className='flex py-10 justify-center'>
                        <Pagination count={10} shape="rounded" variant='outlined' color='primary'
                                    onChange={(e, value) => handelPageChange(value)}
                        />
                    </div>
                </div>


            </div>

        </div>
    );
};

export default Product;
