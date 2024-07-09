import { Component, computed, inject, OnInit, Signal } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user';
import { Address } from '../models/address';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent {
  authService = inject(AuthService);
  formBuilder = inject(FormBuilder);
  commonService = inject(CommonService)

  profileForm = this.formBuilder.group({
    fullName : [''],
    emailId : [''],
    phoneNo : [''],
    address : [new Array<Address>]
  });

  ngOnInit() {
    this.commonService.profileSubject$.subscribe({
      next:()=>{
        this.setFormValues();
      }
    })
  }

  setFormValues(){
    this.profileForm.setValue({
      fullName: this.authService.currentUser().firstName + " " + this.authService.currentUser().lastName,
      emailId: this.authService.currentUser().emailId,
      phoneNo: this.authService.currentUser().phoneNumber,
      address: this.authService.currentUser().address
    });
  }
}
