import {Product} from "./ProductType";
import {User} from "./UserType";

export interface CartItem {
    id: number,
    cart?: Cart
    product: Product,
    quantity: number,
    size: string,
    mrpPrice: number,
    sellingPrice: number,
    userId: number
}

export interface Cart {
    id: number,
    cartItems: CartItem[],
    user: User,
    totalSellingPrice: number,
    totalItems: number,
    totalMrpPrice: number,
    discount: number,
    couponCode: string | null,
}