import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { UserOrder } from '../models/userOrder';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private url = "http://localhost:3000/";
  httpClient = inject(HttpClient)

  createOrder(payload){
    return this.httpClient.post(this.url+'order/create',payload);
  }

  getOrders(sortDate):Observable<Array<UserOrder>>{
    return this.httpClient.get<Array<UserOrder>>(this.url+'order/getuserorders',{params:{sortDate}});
  }

}
