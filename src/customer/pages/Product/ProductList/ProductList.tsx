import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FilterState } from '../../../../types/FilterType';
import Filter from '../Filter/Filter';
import { useAppDispatch, useAppSelector } from '../../../../state/store';
import { fetchProducts } from '../../../../state/slices/productSlice';
import ProductCard from '../ProductCard';
import { Pagination, CircularProgress, Backdrop, Typography } from '@mui/material';
import { SentimentDissatisfied } from '@mui/icons-material';
import { Product } from '../../../../types/ProductType';
import { homeCategories } from '../../../../data/homeCategories';

const ProductList = () => {
    const dispatch = useAppDispatch();
    const { products, totalPages, loading } = useAppSelector(state => state.filterProduct);
    const [searchParams] = useSearchParams();
    const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
    const [filters, setFilters] = useState<FilterState & { pageNumber: number }>({
        isOpen: false,
        pageNumber: 0,
        brand: searchParams.get('brand') || undefined,
        category: searchParams.get('category') || undefined
    });
    const [isChangingPage, setIsChangingPage] = useState(false);

    useEffect(() => {
        const brandFromUrl = searchParams.get('brand');
        const categoryFromUrl = searchParams.get('category');
        
        setFilters(prev => ({
            ...prev,
            brand: brandFromUrl || undefined,
            category: categoryFromUrl || undefined,
            pageNumber: 0
        }));
    }, [searchParams]);

    useEffect(() => {
        dispatch(fetchProducts(filters));
    }, [dispatch, filters]);

    useEffect(() => {
        if (!loading && products) {
            setIsChangingPage(true);
            const timer = setTimeout(() => {
                setDisplayedProducts(products);
                setIsChangingPage(false);
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [products, loading]);

    const handleFilterChange = (newFilters: FilterState) => {
        setIsChangingPage(true);
        setFilters({
            ...newFilters,
            pageNumber: 0
        });
    };

    const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
        setIsChangingPage(true);
        setFilters(prev => ({
            ...prev,
            pageNumber: value - 1
        }));
    };

    const renderProducts = () => {
        const productsToShow = isChangingPage ? displayedProducts : products;
        return productsToShow?.map((product, index) => (
            <div key={index} 
                 className={`transition-all duration-300 ${isChangingPage ? 'opacity-50' : 'opacity-100'}`}>
                <ProductCard item={product} />
            </div>
        ));
    };

    const currentCategoryName = filters.category ? 
        homeCategories.find(c => c.categoryId === filters.category)?.name : 
        '';

    return (
        <div className="flex flex-col min-h-screen">
            <div className="w-full p-4 bg-white shadow-sm">
                <Filter currentFilters={filters} onFilterChange={handleFilterChange} />
            </div>
            
            <div className="flex-1 p-8">
                {loading ? (
                    <Backdrop open={true} sx={{ zIndex: 9999, color: '#009688' }}>
                        <CircularProgress color="primary" />
                    </Backdrop>
                ) : (!products || products.length === 0) ? (
                    <div className="flex flex-col items-center justify-center h-full">
                        <SentimentDissatisfied sx={{ fontSize: 60, color: 'text.secondary' }} />
                        <Typography variant="h6" color="text.secondary" mt={2}>
                            Không tìm thấy sản phẩm nào
                        </Typography>
                        {filters.category && (
                            <Typography variant="body1" color="text.secondary" mt={1}>
                                trong danh mục {currentCategoryName}
                            </Typography>
                        )}
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {renderProducts()}
                        </div>
                        {totalPages > 1 && (
                            <div className="flex justify-center mt-8">
                                <Pagination
                                    count={totalPages}
                                    page={filters.pageNumber + 1}
                                    onChange={handlePageChange}
                                    color="primary"
                                    disabled={loading}
                                    sx={{
                                        '& .MuiPaginationItem-root': {
                                            transition: 'all 0.3s ease-in-out',
                                        },
                                        '& .MuiPaginationItem-root:hover': {
                                            backgroundColor: 'rgba(0, 150, 136, 0.1)',
                                        },
                                        '& .Mui-selected': {
                                            backgroundColor: '#009688 !important',
                                            color: 'white !important',
                                        }
                                    }}
                                />
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default ProductList; 