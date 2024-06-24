import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CommonService } from '../services/common.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
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

  onSubmit() {
    this.loaderService.start();
    this.authService.login(this.loginForm.value).subscribe(
      {
        next: (res) => {
          localStorage.setItem('authToken', res["bearerToken"]);
          this.authService.currentUser.set(res);
          this.loaderService.stop();
          this.router.navigateByUrl('/products');
        },
      error: () => {
        this.loaderService.stop();
        this.commonService.showToast({message:'Incorrect user credentials',type:"error"});
      }});
  }

}
