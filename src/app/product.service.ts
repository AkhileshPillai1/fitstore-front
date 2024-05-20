import { Injectable } from '@angular/core';
import { Products } from './products/products';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }

  getProducts():Observable<object[]> {
    return of(Products);
  }

  getProduct(id: string): Observable<object> {
    // For now, assume that a hero with the specified `id` always exists.
    // Error handling will be added in the next step of the tutorial.
    const product = Products.find(p => p.productName === id)!;
    return of(product);
  }
}
