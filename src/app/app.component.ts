import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { ToastMessageComponent } from './toast-message/toast-message.component';
import { AuthService } from './services/auth.service';
import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, ToastMessageComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor() { }
  authService = inject(AuthService);
  title = 'fitstore-front';
  private httpClient = inject(HttpClient);
  private router = inject(Router);
  private url = "http://localhost:3000/";
  ngOnInit() {
    this.httpClient.get(`${this.url}users/getUserDetails`).subscribe({
      next: (res) => {
        this.authService.currentUser.set(res);
      },
      error: () => {
        this.authService.currentUser.set(null);
      }
    })
  }

  logout() {
    localStorage.removeItem('authToken');
    this.authService.currentUser.set(null);
    this.router.navigateByUrl('/products');
  }
}
