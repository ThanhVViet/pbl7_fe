import {Product} from "./ProductType";
import {User} from "./UserType";

export interface CartItem {
    id: number,
    cart?: Cart
    // product: Product,
    quantity: number,
    size: string,
    mrpPrice: number,
    productPrice: number,
    productName: string,
    userId: number
    images: string[]
}

export interface Cart {
    id: number,
    items: CartItem[],
    user: User,
    totalSellingPrice: number,
    totalItems: number,
    totalMrpPrice: number,
    discount: number,
    couponCode: string | null,
    total: number | 0
}