import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-seller',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './seller.component.html',
  styleUrl: './seller.component.css'
})
export class SellerComponent {
  authService = inject(AuthService);
  router = inject(Router);

  selectedPage:string = "dashboard";

  logout() {
    localStorage.removeItem('authToken');
    this.authService.currentUser.set(null);
    this.router.navigateByUrl('/products');
  }
}
