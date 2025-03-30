import {User} from "./UserType";
import {Product} from "./ProductType";

export interface Wishlist {
    id: number;
    user: User;
    products: Product[];
}


export interface AddProductToWishlistPayload {
    wishlistId: number;
    productId: number;
}