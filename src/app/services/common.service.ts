import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private url = "http://localhost:3000/";
  private toastSubject = new Subject<string>();
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

  showToast(message: string): void {
    this.toastSubject.next(message);
  }

}
