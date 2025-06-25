export interface FilterParams {
    category?: string;
    brand?: string;
    color?: string;
    maxPrice?: number;
    minPrice?: number;
    sort?: string;
    pageNumber?: number;
}

export interface FilterState extends FilterParams {
    isOpen: boolean;
} 