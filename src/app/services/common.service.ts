import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
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
    const headers = new HttpHeaders({
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJOYW1lIjoiSm9objEyMyIsImVtYWlsSWQiOiJqb2huc21pdGhAZ21haWwuY29tIn0sImlhdCI6MTcxNzUwMDAxMiwiZXhwIjoxNzE3NTAzNjEyfQ.O95nWAlDLNr51NC2y0K9kic1RK1-GdRKYoBEKv0Om1A'
    });
    return this.http.post(`${this.url}common/addtocart`,cartObject,{headers});
  }

  showToast(message: string): void {
    this.toastSubject.next(message);
  }

}
