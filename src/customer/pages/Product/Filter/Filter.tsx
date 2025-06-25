import React, { useState } from 'react';
import { FilterState } from '../../../../types/FilterType';
import { brand } from '../../../../data/brand';
import { homeCategories } from '../../../../data/homeCategories';
import { colors } from '../../../../data/filter/colors';
import { 
    Slider, 
    FormControl, 
    InputLabel, 
    Select, 
    MenuItem, 
    Button, 
    Drawer, 
    IconButton,
    Box,
    Chip,
    Stack,
    Typography,
    Popover,
    Paper,
    Breadcrumbs,
    Link
} from '@mui/material';
import { FilterList, Close, NavigateNext } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface FilterProps {
    onFilterChange: (filters: FilterState) => void;
    currentFilters: FilterState;
}

const Filter: React.FC<FilterProps> = ({ onFilterChange, currentFilters }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const navigate = useNavigate();

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClearFilters = () => {
        onFilterChange({
            isOpen: currentFilters.isOpen,
            pageNumber: 0
        });
        navigate('/products');
    };

    const handleNavigateToAllProducts = () => {
        navigate('/products');
        onFilterChange({
            ...currentFilters,
            category: undefined,
            pageNumber: 0
        });
    };

    const open = Boolean(anchorEl);
    const id = open ? 'filter-popover' : undefined;

    const currentCategory = currentFilters.category ? 
        homeCategories.find(c => c.categoryId === currentFilters.category) : null;

    return (
        <div className="relative">
            {/* Desktop view */}
            <div className="hidden md:block">
                <div className="mb-4">
                    <Breadcrumbs separator={<NavigateNext fontSize="small" />} aria-label="breadcrumb">
                        <Link
                            component="button"
                            underline="hover"
                            color="inherit"
                            onClick={handleNavigateToAllProducts}
                        >
                            Tất cả sản phẩm
                        </Link>
                        {currentCategory && (
                            <Typography color="text.primary">{currentCategory.name}</Typography>
                        )}
                    </Breadcrumbs>
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        aria-describedby={id}
                        onClick={handleClick}
                        variant="outlined"
                        startIcon={<FilterList />}
                        size="small"
                    >
                        Bộ lọc
                    </Button>

                    {renderActiveFilters(currentFilters, onFilterChange)}
                </div>

                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                >
                    <Paper sx={{ p: 2, width: 600 }}>
                        <FilterContent 
                            currentFilters={currentFilters}
                            onFilterChange={(filters) => {
                                onFilterChange(filters);
                            }}
                            onClearFilters={() => {
                                handleClearFilters();
                                handleClose();
                            }}
                            isMobile={false}
                        />
                    </Paper>
                </Popover>
            </div>

            {/* Mobile view */}
            <div className="block md:hidden">
                <div className="mb-4">
                    <Breadcrumbs 
                        separator={<NavigateNext fontSize="small" />} 
                        aria-label="breadcrumb"
                        sx={{ 
                            '& .MuiBreadcrumbs-ol': { 
                                flexWrap: 'nowrap',
                                whiteSpace: 'nowrap',
                                overflow: 'auto'
                            }
                        }}
                    >
                        <Link
                            component="button"
                            underline="hover"
                            color="inherit"
                            onClick={handleNavigateToAllProducts}
                            sx={{ fontSize: '0.875rem' }}
                        >
                            Tất cả sản phẩm
                        </Link>
                        {currentCategory && (
                            <Typography color="text.primary" sx={{ fontSize: '0.875rem' }}>
                                {currentCategory.name}
                            </Typography>
                        )}
                    </Breadcrumbs>
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        onClick={() => setIsOpen(true)}
                        variant="outlined"
                        startIcon={<FilterList />}
                        size="small"
                        fullWidth
                    >
                        Bộ lọc
                    </Button>
                </div>

                <div className="mt-2">
                    {renderActiveFilters(currentFilters, onFilterChange)}
                </div>

                <Drawer
                    anchor="bottom"
                    open={isOpen}
                    onClose={() => setIsOpen(false)}
                    PaperProps={{
                        sx: {
                            maxHeight: '80vh',
                            borderTopLeftRadius: '16px',
                            borderTopRightRadius: '16px',
                            padding: '16px'
                        }
                    }}
                >
                    <div className="flex justify-between items-center mb-4">
                        <Typography variant="h6">Bộ lọc</Typography>
                        <IconButton onClick={() => setIsOpen(false)} size="small">
                            <Close />
                        </IconButton>
                    </div>
                    <FilterContent 
                        currentFilters={currentFilters}
                        onFilterChange={(filters) => {
                            onFilterChange(filters);
                            setIsOpen(false);
                        }}
                        onClearFilters={() => {
                            handleClearFilters();
                            setIsOpen(false);
                        }}
                        isMobile={true}
                    />
                </Drawer>
            </div>
        </div>
    );
};

const renderActiveFilters = (currentFilters: FilterState, onFilterChange: (filters: FilterState) => void) => {
    const filters = [];
    
    if (currentFilters.minPrice || currentFilters.maxPrice) {
        filters.push(
            <Chip 
                key="price"
                label={`${currentFilters.minPrice?.toLocaleString()}đ - ${currentFilters.maxPrice?.toLocaleString()}đ`}
                onDelete={() => onFilterChange({...currentFilters, minPrice: undefined, maxPrice: undefined})}
                size="small"
                className="m-1"
            />
        );
    }

    if (currentFilters.brand) {
        const brandName = brand.find(b => b.id === currentFilters.brand)?.name;
        filters.push(
            <Chip 
                key="brand"
                label={`Thương hiệu: ${brandName}`}
                onDelete={() => onFilterChange({...currentFilters, brand: undefined})}
                size="small"
                className="m-1"
            />
        );
    }

    if (currentFilters.color) {
        filters.push(
            <Chip 
                key="color"
                label={`Màu sắc: ${currentFilters.color}`}
                onDelete={() => onFilterChange({...currentFilters, color: undefined})}
                size="small"
                className="m-1"
            />
        );
    }

    if (currentFilters.category) {
        const categoryName = homeCategories.find(c => c.categoryId === currentFilters.category)?.name;
        filters.push(
            <Chip 
                key="category"
                label={`Danh mục: ${categoryName}`}
                onDelete={() => {
                    window.history.pushState({}, '', '/products');
                    onFilterChange({...currentFilters, category: undefined});
                }}
                size="small"
                className="m-1"
            />
        );
    }

    if (currentFilters.sort) {
        const sortLabels: {[key: string]: string} = {
            'price_asc': 'Giá: Thấp đến Cao',
            'price_desc': 'Giá: Cao đến Thấp',
            'name_asc': 'Tên: A-Z',
            'name_desc': 'Tên: Z-A'
        };
        filters.push(
            <Chip 
                key="sort"
                label={`Sắp xếp: ${sortLabels[currentFilters.sort]}`}
                onDelete={() => onFilterChange({...currentFilters, sort: undefined})}
                size="small"
                className="m-1"
            />
        );
    }

    return filters.length > 0 ? (
        <div className="flex flex-wrap items-center gap-1">
            <Typography variant="caption" color="textSecondary">
                Bộ lọc đang dùng:
            </Typography>
            {filters}
        </div>
    ) : null;
};

interface FilterContentProps {
    currentFilters: FilterState;
    onFilterChange: (filters: FilterState) => void;
    onClearFilters: () => void;
    isMobile: boolean;
}

const FilterContent: React.FC<FilterContentProps> = ({ currentFilters, onFilterChange, onClearFilters, isMobile }) => {
    const handlePriceChange = (event: Event, newValue: number | number[]) => {
        const [min, max] = newValue as number[];
        onFilterChange({
            ...currentFilters,
            minPrice: min,
            maxPrice: max
        });
    };

    const handleBrandChange = (event: any) => {
        onFilterChange({
            ...currentFilters,
            brand: event.target.value
        });
    };

    const handleCategoryChange = (event: any) => {
        onFilterChange({
            ...currentFilters,
            category: event.target.value
        });
    };

    const handleSortChange = (event: any) => {
        onFilterChange({
            ...currentFilters,
            sort: event.target.value
        });
    };

    const handleColorChange = (event: any) => {
        onFilterChange({
            ...currentFilters,
            color: event.target.value
        });
    };

    if (isMobile) {
        return (
            <div className="space-y-6">
                <div>
                    <h3 className="text-lg font-semibold mb-2">Danh mục</h3>
                    <FormControl fullWidth>
                        <Select
                            value={currentFilters.category || ''}
                            onChange={handleCategoryChange}
                            displayEmpty
                        >
                            <MenuItem value="">Tất cả</MenuItem>
                            {homeCategories.map((c) => (
                                <MenuItem key={c.categoryId} value={c.categoryId}>
                                    {c.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>

                <FormControl fullWidth>
                    <InputLabel>Thương hiệu</InputLabel>
                    <Select
                        value={currentFilters.brand || ''}
                        onChange={handleBrandChange}
                        label="Thương hiệu"
                    >
                        <MenuItem value="">Tất cả</MenuItem>
                        {brand.map((b) => (
                            <MenuItem key={b.id} value={b.id}>
                                {b.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl fullWidth>
                    <InputLabel>Màu sắc</InputLabel>
                    <Select
                        value={currentFilters.color || ''}
                        onChange={handleColorChange}
                        label="Màu sắc"
                    >
                        <MenuItem value="">Tất cả</MenuItem>
                        {colors.map((color) => (
                            <MenuItem key={color.name} value={color.name}>
                                <div className='flex gap-3'>
                                    <span style={{backgroundColor: color.hex}}
                                          className={`h-5 w-5 rounded-full ${color.name === "White" ? "border" : ""}`}/>
                                    <p>{color.name}</p>
                                </div>
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <Button 
                    variant="outlined" 
                    color="primary" 
                    fullWidth
                    onClick={onClearFilters}
                >
                    Xóa bộ lọc
                </Button>
            </div>
        );
    }

    return (
        <Stack spacing={3}>
            <FormControl size="small" fullWidth>
                <InputLabel>Danh mục</InputLabel>
                <Select
                    value={currentFilters.category || ''}
                    onChange={handleCategoryChange}
                    label="Danh mục"
                >
                    <MenuItem value="">Tất cả</MenuItem>
                    {homeCategories.map((c) => (
                        <MenuItem key={c.categoryId} value={c.categoryId}>
                            {c.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl size="small" fullWidth>
                <InputLabel>Thương hiệu</InputLabel>
                <Select
                    value={currentFilters.brand || ''}
                    onChange={handleBrandChange}
                    label="Thương hiệu"
                >
                    <MenuItem value="">Tất cả</MenuItem>
                    {brand.map((b) => (
                        <MenuItem key={b.id} value={b.id}>
                            {b.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl size="small" fullWidth>
                <InputLabel>Màu sắc</InputLabel>
                <Select
                    value={currentFilters.color || ''}
                    onChange={handleColorChange}
                    label="Màu sắc"
                >
                    <MenuItem value="">Tất cả</MenuItem>
                    {colors.map((color) => (
                        <MenuItem key={color.name} value={color.name}>
                            <div className='flex gap-3'>
                                <span style={{backgroundColor: color.hex}}
                                      className={`h-5 w-5 rounded-full ${color.name === "White" ? "border" : ""}`}/>
                                <p>{color.name}</p>
                            </div>
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <Button 
                variant="outlined" 
                color="primary"
                onClick={onClearFilters}
                size="small"
            >
                Xóa tất cả
            </Button>
        </Stack>
    );
};

export default Filter; 