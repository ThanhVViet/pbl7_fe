import {HomeCategory} from "./HomeCategoryType";

export interface Deal{
    id?: number;
    discount: number;
    category: HomeCategory;
}

export interface ApiResponse {
    message: string;
    status: boolean;
}

