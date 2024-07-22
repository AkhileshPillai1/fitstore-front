import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private url = "http://localhost:3000/";
  httpClient = inject(HttpClient)

  createOrder(payload){
    return this.httpClient.post(this.url+'order/create',payload);
  }

}
