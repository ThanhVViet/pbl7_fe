import React, { useState } from 'react';
import ProductTable from "./ProductTable";
import { Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { homeCategories } from "../../../data/homeCategories";

const Products = () => {
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState('');

    const handleCategoryChange = (event: SelectChangeEvent) => {
        setSelectedCategory(event.target.value);
    };

    return (
        <Box>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <h1 className="font-bold text-xl">Danh sách sản phẩm</h1>
            </Box>

            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                flexWrap="wrap"
                gap={2}
                mb={3}
            >
                <FormControl sx={{ minWidth: 240 }}>
                    <InputLabel id="category-filter-label">Loại sản phẩm</InputLabel>
                    <Select
                        labelId="category-filter-label"
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                        label="Loại sản phẩm"
                    >
                        <MenuItem value="">Tất cả</MenuItem>
                        {homeCategories.map((item) => (
                            <MenuItem key={item.categoryId} value={item.categoryId}>
                                {item.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <Button
                    variant="contained"
                    size="small"
                    onClick={() => navigate('/admin/products/add-product')}
                    sx={{ height: '36px', minWidth: '120px', fontSize: '0.85rem', padding: '4px 12px' }}
                >
                    Thêm Sản Phẩm
                </Button>
            </Box>

            <ProductTable selectedCategory={selectedCategory} />
        </Box>
    );
};

export default Products;
