import { Component, computed, inject, OnInit, Signal } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user';
import { Address } from '../models/address';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup, FormArray } from '@angular/forms';
import { CommonService } from '../services/common.service';
import { CommonModule } from '@angular/common';
import { NgxUiLoaderRouterModule, NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent {
  authService = inject(AuthService);
  formBuilder = inject(FormBuilder);
  commonService = inject(CommonService);
  loaderService = inject(NgxUiLoaderService);

  isFormEditable: boolean = false;
  showModal: boolean = false;
  isModalModeNew: boolean = true;//check whether modal is open for new address or existing
  indexForEditModal:number = 0;

  profileForm: FormGroup = this.formBuilder.group({
    firstName: [{ value: '', disabled: true }],
    lastName: [{ value: '', disabled: true }],
    emailId: [{ value: '', disabled: true }],
    phoneNumber: [{ value: '', disabled: true }],
    address: this.formBuilder.array([])
  });

  addressForm: FormGroup = this.formBuilder.group<Address>({
    title: '',
    line1: '',
    line2: '',
    line3: '',
    city: '',
    state: '',
    zipcode:''
  });

  setAddresses(addresses: Address[]): void {
    const addressFGs = addresses.map(address => this.formBuilder.group(address));
    const addressFormArray = this.formBuilder.array(addressFGs);
    this.profileForm.setControl('address', addressFormArray);
  }

  get address() {
    return this.profileForm.get('address') as FormArray;
  }

  addAddress(){
    this.address.push(this.formBuilder.group(this.addressForm.value));
    this.callUpdateAddressApi();
  }

  editAddress(){
    this.address.setControl(this.indexForEditModal, this.formBuilder.group(this.addressForm.value));
    this.callUpdateAddressApi();
  }

  removeAddress(index: number): void {
    this.address.removeAt(index);
    this.callUpdateAddressApi();
  }

  openModalForNewAddress(){
    this.showModal=true;
    this.isModalModeNew=true;
    if(this.isFormEditable=true)
      this.toggleForm()
  }

  openModalForEdit(index: number){
    this.addressForm = this.formBuilder.group(this.address.at(index).value);
    this.indexForEditModal = index;
    this.isModalModeNew = false;
    this.showModal = true;
    if(this.isFormEditable=true)
      this.toggleForm()
  }



  callUpdateAddressApi(){
    this.loaderService.start();
    this.authService.updateAddresses(this.profileForm.get('address').value).subscribe({
      next: (res)=>{
        if(this.showModal)
          this.closeModal();
        this.loaderService.stop();
        this.commonService.showToast({ message: 'Changes saved!', type: "success", timeout: 250 });
      },
      error: ()=>{
        this.loaderService.stop();
        this.commonService.showToast({ message: 'Something went wrong!', type: "error", timeout: 250 });
      }
    })
  }

  closeModal(){
    this.showModal = false;
    this.addressForm.reset();
  }

  ngOnInit() {
    if (this.authService.currentUser()) {
      this.setFormValues();
      this.setAddresses(this.authService.currentUser().address)
    }
    else {
      this.commonService.profileSubject$.subscribe({
        next: () => {
          this.setFormValues();
          this.setAddresses(this.authService.currentUser().address)
        }
      })
    }
  }

  toggleForm() {
    if (this.isFormEditable) {
      this.isFormEditable = false;
      this.setFormValues();
      this.profileForm.disable();
    }
    else {
      this.isFormEditable = true;
      this.profileForm.enable();
    }
  }

  saveChanges() {
    this.loaderService.start();
    this.authService.updateUserDetails(this.profileForm.value).subscribe({
      next: (res: User) => {
        this.authService.currentUser.set(res);
        this.loaderService.stop();
        this.commonService.showToast({ message: 'Changes saved!', type: "success", timeout: 250 });
        this.toggleForm();
      },
      error: ()=>{
        this.loaderService.stop();
        this.commonService.showToast({ message: 'Something went wrong!', type: "error", timeout: 250 });
      }
    })
  }

  setFormValues() {
    this.profileForm.patchValue({
      firstName: this.authService.currentUser().firstName,
      lastName: this.authService.currentUser().lastName,
      emailId: this.authService.currentUser().emailId,
      phoneNumber: this.authService.currentUser().phoneNumber,
    });
  }
}
