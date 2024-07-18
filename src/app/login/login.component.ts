import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonService } from '../services/common.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private formBuilder: FormBuilder, private router: Router) { }
  authService = inject(AuthService);
  commonService = inject(CommonService);
  loaderService = inject(NgxUiLoaderService);
  loginForm = this.formBuilder.group({
    emailId: ['johnsmith@gmail.com', Validators.required],
    password: ['johnsmithx321']
  })

  showPassword: boolean = false;

  onSubmit() {
    this.loaderService.start();
    this.authService.login(this.loginForm.value).subscribe(
      {
        next: (res) => {
          localStorage.setItem('authToken', res["bearerToken"]);
          this.authService.currentUser.set(res['user']);
          this.loaderService.stop();
          this.router.navigateByUrl('/products');
        },
        error: () => {
          this.loaderService.stop();
          this.commonService.showToast({ message: 'Incorrect user credentials', type: "error" });
        }
      });
  }

}
