import { Address } from "./address";
import { OrderItem } from "./orderItem";

export interface SellerOrder {
    _id: string,
    sellerId: string,
    orderItems: Array<OrderItem>,
    buyerName: string,
    buyerEmail: string,
    buyerContactNumber: string,
    deliveryAddress: Address,
    totalAmount: number,
    userOrderId: string,
    createdAt:Date,
    updatedAt:Date
}