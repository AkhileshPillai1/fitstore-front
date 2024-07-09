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

  getProducts(filters = {}): Observable<object[]> {
    if (Object.keys(filters).length == 0) {
      return this.http.get<object[]>(this.url);
    }
    else {
      let params = new HttpParams();
      Object.keys(filters).forEach(key => {
        params = params.set(key, filters[key]);
      });
      return this.http.get<object[]>(this.url, { params });
    }
  }

  getProduct(id: string): Observable<object> {
    return this.http.get<object[]>(`${this.url}${id}`);
  }

  addReview(productId, payload): Observable<object> {
    return this.http.post<object[]>(`${this.url}addreview/?productId=${productId}`, payload);
  }
}
