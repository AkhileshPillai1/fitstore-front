import { Component, Input } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxUiLoaderRouterModule, NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';

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
  coupon: string;
  couponDiscount: number = 0;
  validCoupon: boolean = false;
  quantity: Array<number>;
  couponAmt: number;

  constructor(
    private commonService: CommonService,
    private loaderService: NgxUiLoaderService,
    private router: Router
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

    let total = this.totalMrp - this.discountOnMrp + this.deliveryFee;
    this.couponAmt = total * this.couponDiscount / 100;
    this.totalAmount = (total - (total * this.couponDiscount / 100)).toFixed(2);
  }

  getCartDetails() {
    this.commonService.getCartDetails().subscribe((res) => {
      this.cart = res;
      this.calculatePriceDetails();
    });
  }

  deleteItemFromCart(productId) {
    this.loaderService.start();
    this.commonService.deleteProductFromCart(productId).subscribe({
      next: (res) => {
        if (res) {
          this.commonService.showToast({ message: 'Successfully deleted!', type: "success", timeout: 250 });
          this.getCartDetails();
          this.loaderService.stop();
        }
      },
      error: () => {
        this.commonService.showToast({ message: 'Something went wrong, please try again later', type: "error", timeout: 250 });
        this.loaderService.stop();
      }
    })
  }

  openProductDetail(productId) {
    this.router.navigate(['/detail/', productId])
  }

  onChangeQuantity(product) {
    this.loaderService.start();
    let payload = {
      "productId": product.product._id,
      "userQuantity": product.userQuantity
    }
    this.commonService.updateCartQuantity(payload).subscribe({
      next: (res) => {
        this.calculatePriceDetails();
        this.loaderService.stop();
      },
      error: () => {
        this.loaderService.stop();
      }
    });
  }

  checkAndApplyCoupon() {
    this.loaderService.start();
    this.commonService.validateAndFetchCoupon(this.coupon).subscribe({
      next: (res) => {
        if (res["isValid"]) {
          this.couponDiscount = res["couponData"]["discountPercentage"];
          this.loaderService.stop();
          this.commonService.showToast({ message: `${this.couponDiscount}% off applied successfully!`, type: "success",timeout:250 });
          this.validCoupon = true;
          this.calculatePriceDetails();
        }
        else {
          this.commonService.showToast({ message: `Invalid coupon!`, type: "error", timeout:300 });
          setTimeout(() => {
            this.loaderService.stop()
          }, 500);
        }
      }
    });
  }

  remmoveCoupon() {
    this.couponDiscount = 0;
    this.coupon = "";
    this.validCoupon = false;
    this.calculatePriceDetails();
  }

}
