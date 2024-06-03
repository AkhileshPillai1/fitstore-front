import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private url = "http://localhost:3000/products/";
  constructor(
    private http: HttpClient
  ) { }

  // getProducts():Observable<object[]> {
  //   return of(Products);
  // }

  /** GET heroes from the server */
  getProducts(): Observable<object[]> {
  return this.http.get<object[]>(this.url);
}

  getProduct(id: string): Observable<object> {
    return this.http.get<object[]>(`${this.url}${id}`);
    // const product = Products.find(p => p.productName === id)!;
    // return of(product);
  }
}
