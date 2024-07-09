import { Address } from "./address";
import { CartItem } from "./cartItem";

export interface User{
    _id:string,
    userName:string,
    emailId:string,
    password:string,
    firstName:string,
    lastName:String,
    phoneNumber:string,
    persona:number,
    address:Array<Address>,
    cart:Array<CartItem>,
    createdAt:Date,
    updatedAt:Date
}