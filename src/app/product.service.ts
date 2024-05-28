import { Injectable } from '@angular/core';
import { Products } from './products/products';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private heroesUrl = "http://localhost:3000/products/";
  constructor(
    private http: HttpClient
  ) { }

  // getProducts():Observable<object[]> {
  //   return of(Products);
  // }

  /** GET heroes from the server */
  getProducts(): Observable<object[]> {
  return this.http.get<object[]>(this.heroesUrl);
}

  getProduct(id: string): Observable<object> {
    return this.http.get<object[]>(`${this.heroesUrl}${id}`);
    // const product = Products.find(p => p.productName === id)!;
    // return of(product);
  }
}
