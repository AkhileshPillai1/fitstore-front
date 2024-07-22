import { Address } from "./address";
import { OrderItem } from "./orderItem";

export interface OrderDetails{
    totalAmount:number,
    deliveryFee:number,
    mrp:number,
    discountOnMrp:number
    couponDiscount:number,
    isCouponApplied:boolean
}

export interface UserOrder {
    _id:string,
    userId:string,
    orderDetails:OrderDetails,
    orderItems:Array<OrderItem>,
    createdAt:Date,
    updatedAt:Date,
    deliveryAddress:Address
}