import { Component, Input } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  cart;
  totalAmount;
  discountOnMrp;
  totalMrp;
  deliveryFee;
  quantity: Array<number>;

  constructor(
    private commonService: CommonService,
  ) {
    this.deliveryFee = 50;
   }

  @Input('ngModel')

  ngOnInit(): void {
    this.getCartDetails();
    this.quantity = Array(10).fill(0).map((x, i) => { return i + 1 })
  }

  calculatePriceDetails() {
    this.discountOnMrp = this.cart.reduce((sum, value) => {
      return sum + (value.product.price * value.userQuantity * value.product.discountPercentage / 100);
    }, 0);

    this.totalMrp = this.cart.reduce((sum, value) => {
      return sum + (value.product.price * value.userQuantity);
    }, 0);

    this.totalAmount = this.totalMrp - this.discountOnMrp + this.deliveryFee;
  }

  getCartDetails() {
    this.commonService.getCartDetails().subscribe((res) => {
      this.cart = res;
      this.calculatePriceDetails();
    });
  }

  deleteItemFromCart(productId) {
    this.commonService.deleteProductFromCart(productId).subscribe({
      next: (res) => {
        if (res) {
          this.commonService.showToast({ message: 'Successfully deleted!', type: "success" });
          this.getCartDetails();
        }
      },
      error: () => {
        this.commonService.showToast({ message: 'Something went wrong, please try again later', type: "error" });
      }
    })
  }

  onChangeQuantity(product) {
    let payload = {
      "productId": product.product._id,
      "userQuantity": product.userQuantity
    }
    this.commonService.updateCartQuantity(payload).subscribe((res) => {
      this.calculatePriceDetails();
    })
  }
}
