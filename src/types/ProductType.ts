import {Seller} from "./SellerType";

export interface Product {
    id?: number;
    title:string;
    mrpPrice: number;
    sellingPrice: number;
    description: string;
    discountPercentage: number;
    quantity: number;
    color: string;
    images: string[];
    numRatings?: number;
    category?: Category;
    seller?: Seller;
    createAt?:Date;
    sizes:string;
}

interface Category {
    id?: number;
    name: string;
    categoryId: string;
    parentCategory?: Category;
    level: number;
}

