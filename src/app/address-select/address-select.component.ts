import { Component, inject } from '@angular/core';
import { Address } from '../models/address';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-address-select',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './address-select.component.html',
  styleUrl: './address-select.component.css'
})
export class AddressSelectComponent {

  authService = inject(AuthService);

  addresses:Array<Address> = this.authService.currentUser().address;
  selectedAddress:Address;
  defaultAddress:Address|null;

  assignDefaultAddressPresent(){
    this.defaultAddress = this.addresses.find(add=>add.isDefault==true);
    if(this.defaultAddress){
      this.selectedAddress = this.defaultAddress;
    }
  }

  ngOnInit(){
    this.assignDefaultAddressPresent();
  }
}
