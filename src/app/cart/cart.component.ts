import { Component } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NgIf,NgFor],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  constructor(
    private commonService: CommonService,
  ){}
  cart;
  ngOnInit(): void {
    this.getCartDetails();
  }

  getCartDetails(){
    this.commonService.getCartDetails()
      .subscribe((res) => {
        this.cart = res;
        console.log(this.cart);
      });
  }
}
