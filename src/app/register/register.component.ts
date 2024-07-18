import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { CommonService } from '../services/common.service';
import { AuthService } from '../services/auth.service';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { numericValidator } from '../custom-validators/numericValidator';
import _ from 'lodash';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(private formBuilder: FormBuilder, private router: Router) { }
  authService = inject(AuthService);
  commonService = inject(CommonService);
  loaderService = inject(NgxUiLoaderService);
  registerForm = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: [''],
    phoneNumber: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(13), numericValidator()]],
    emailId: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
    persona: [1]
  })

  showPassword: boolean = false;
  showPassword2: boolean = false;
  passwordsMatch: boolean = true;

  ngOnInit() {
    this.setSubscriptionsForPasswordCheck();
  }

  setSubscriptionsForPasswordCheck() {
    this.registerForm.get('password').valueChanges.subscribe({
      next: () => {
        if (this.registerForm.get('password').value === this.registerForm.get('confirmPassword').value)
          this.passwordsMatch = true;
        else
          this.passwordsMatch = false;
      }
    });
    this.registerForm.get('confirmPassword').valueChanges.subscribe({
      next: () => {
        if (this.registerForm.get('password').value === this.registerForm.get('confirmPassword').value)
          this.passwordsMatch = true;
        else
          this.passwordsMatch = false;
      }
    });
  }

  onSubmit() {
    this.loaderService.start();
    let payload = _.cloneDeep(this.registerForm.value);
    delete payload.confirmPassword;
    this.authService.register(this.registerForm.value).subscribe(
      {
        next: (res) => {
          if (res['success'])
            this.loginUser({ emailId: this.registerForm.get('emailId').value, password: this.registerForm.get('password').value });
          else {
            this.loaderService.stop();
            this.commonService.showToast({ message: res['message'] ? res['message'] : 'Something went wrong', type: "error" });
          }
        },
        error: (err) => {
          this.loaderService.stop();
          this.commonService.showToast({ message: err.error && err.error.message ? err.error.message :'Something went wrong', type: "error" });
        }
      });
  }

  loginUser(userInfo) {
    this.authService.login(userInfo).subscribe({
      next: (res) => {
        localStorage.setItem('authToken', res["bearerToken"]);
        this.authService.currentUser.set(res['user']);
        this.loaderService.stop();
        this.router.navigateByUrl('/products');
      },
      error: () => {
        this.loaderService.stop();
        this.commonService.showToast({ message: 'Something went wrong', type: "error" });
      }
    })
  }
}
