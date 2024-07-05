import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

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
  getProducts(category = 0): Observable<object[]> {
    let httpParams = new HttpParams().set('category', category);
    return this.http.get<object[]>(this.url, { params: httpParams });
  }

  getProduct(id: string): Observable<object> {
    return this.http.get<object[]>(`${this.url}${id}`);
    // const product = Products.find(p => p.productName === id)!;
    // return of(product);
  }

  addReview(productId, payload): Observable<object> {
    return this.http.post<object[]>(`${this.url}addreview/?productId=${productId}`, payload);
  }
}
