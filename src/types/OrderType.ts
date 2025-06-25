import {Address, User} from "./UserType";
import {Product} from "./ProductType";

export interface OrderState {
    orders: Order[] | null,
    addresses: Address[],
    address: Address | null,
    orderItem: OrderItem | null,
    currentOrder: Order | null,
    paymentOrder: any | null,
    loading: boolean,
    error: string | null
    orderCancelled: boolean,
    lastOrderTime: number | null

}

export interface Order {
    id: number,
    orderId: string,
    user: User,
    sellerId: number,
    items: OrderItem[],
    orderDate: string,
    shippingAddress: Address,
    paymentDetails: any,
    totalMrpPrice: number,
    totalPrice?: number,
    discount?: number,
    orderStatus: OrderStatus,
    totalItem: number,
    deliveryDate: string,
    createdAt: string,
    addressId: number,
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
    totalPrice: number,
    userId: number,
    images: string[],
    productName: string,
    productPrice: number
}

