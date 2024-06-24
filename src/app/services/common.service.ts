import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { ToastMessage } from '../models/toast';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private url = "http://localhost:3000/";
  private toastSubject = new Subject<ToastMessage>();
  toastState = this.toastSubject.asObservable();
  constructor(
    private http: HttpClient
  ) { }

  addToCart(cartObject:object):Observable<object>{
    return this.http.post(`${this.url}common/addtocart`,cartObject);
  }

  getCartDetails(){
    return this.http.get(`${this.url}common/getcart`);
  }

  updateCartQuantity(payLoad: object){
    return this.http.post(`${this.url}common/updateCartQuantity`,payLoad);
  }

  deleteProductFromCart(productId: string){
    return this.http.get(`${this.url}common/deleteproductfromcart`,{params:{productId}});
  }

  validateAndFetchCoupon(couponCode: string){
    return this.http.get(`${this.url}common/validateandfetchcoupon`,{params:{couponCode}});
  }

  showToast(message: ToastMessage): void {
    setTimeout(()=>{
      this.toastSubject.next(message);
    },700)
  }

}
