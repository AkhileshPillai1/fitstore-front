import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private url = "http://localhost:3000/";
  constructor(
    private http: HttpClient
  ) { }

  addToCart(cartObject:object):Observable<object>{
    const headers = new HttpHeaders({
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJOYW1lIjoiSm9objEyMyIsImVtYWlsSWQiOiJqb2huc21pdGhAZ21haWwuY29tIn0sImlhdCI6MTcxNzQzMDExMCwiZXhwIjoxNzE3NDMxMzEwfQ.ldzth1UFMxD6ONarWnwQ5L0FdztUX_dNqx4WCuSRWTg'
    });
    return this.http.post(`${this.url}common/addtocart`,cartObject,{headers});
  }

}
