import {User} from "./UserType";
import {Order} from "./OrderType";
import {Seller} from "./SellerType";

export interface Transaction {
    id: number;
    customer: User;
    order: Order;
    quantity: Seller;
    date: string;

}