export interface Product {
    productCode:string,
    productName:string,
    description:string,
    stars:object,
    reviews:Array<object>,
    images:Array<string>,
    price:number,
    quantity:number,
    discountPercentage:number,
    category:string,
    details:string,
    specs:object,
    seller:string,
    rating:number
}
  