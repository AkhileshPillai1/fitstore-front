import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = "http://localhost:3000/";
  currentUser = signal<Object|undefined|null>(undefined);
  constructor(private http: HttpClient) { }

  login(userInfo){
    return this.http.post(`${this.url}users/login`,userInfo);
  }
}