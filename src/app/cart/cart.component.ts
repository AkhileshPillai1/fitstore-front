import { Component, Input } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NgIf,NgFor,FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  cart;
  quantity: Array<number>;
  
  constructor(
    private commonService: CommonService,
  ){}

  @Input('ngModel')
  
  ngOnInit(): void {
    this.getCartDetails();
    this.quantity = Array(10).fill(0).map((x,i)=>{return i+1})
  }

  getCartDetails(){
    this.commonService.getCartDetails().subscribe((res) => {
      this.cart = res;
    });
  }

  onChangeQunatity(product){
    let payload = {
      "productId": product.product._id,
      "userQuantity":product.userQuantity
    }
    this.commonService.updateCartQuantity(payload).subscribe((res)=>{})
  }
}
