import {Address, User} from "./UserType";
import {Product} from "./ProductType";

export interface OrderState {
    orders: Order[] | null,
    orderItem: OrderItem | null,
    currentOrder: Order | null,
    paymentOrder: any | null,
    loading: boolean,
    error: string | null
    orderCancelled: boolean,
}

export interface Order {
    id: number,
    orderId: string,
    user: User,
    sellerId: number,
    orderItems: OrderItem[],
    orderDate: string,
    shippingAddress: Address,
    paymentDetails: any,
    totalMrpPrice: number,
    totalSellingPrice?: number,
    discount?: number,
    orderStatus: OrderStatus,
    totalItem: number,
    deliveryDate: string,
}

export enum OrderStatus {
    PENDING = 'PENDING',
    SHIPPED = 'SHIPPED',
    DELIVERED = 'DELIVERED',
    CANCELLED = 'CANCELLED',
}

export interface OrderItem {
    id: number,
    order: Order,
    product: Product,
    size:string,
    quantity: number,
    mrpPrice: number,
    sellingPrice: number,
    userId: number,
}

