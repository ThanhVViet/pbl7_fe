import {CartItem} from "../types/CartType";

//default value of acc is 0

//  1: 10
// 2: acc = 10 + 5 => 20
// 3: acc=  20 + 5 => 25
export const sumCartItemSellingPrice = (cartItems: CartItem[]) => {
    return cartItems.reduce((acc, item) => acc + item.sellingPrice * item.quantity, 0)
}