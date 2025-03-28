import {CartItem} from "../types/CartType";

//default value of acc is 0
export const sumCartItemMrpPrice = ( cartItems: CartItem[]) => {
    return cartItems.reduce((acc, item)=> acc + item.mrpPrice * item.quantity, 0)
}