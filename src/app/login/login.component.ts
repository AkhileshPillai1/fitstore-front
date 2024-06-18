import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private formBuilder:FormBuilder,private router:Router){}
  authService = inject(AuthService);
  loginForm = this.formBuilder.group({
    emailId:['', Validators.required],
    password:['']
  })

  onSubmit(){
    this.authService.login(this.loginForm.value).subscribe((res)=>{
      localStorage.setItem('authToken',res["bearerToken"]);
      this.authService.currentUser.set(res);
      this.router.navigateByUrl('/products');
    })
  }

}
