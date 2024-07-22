import { Component, Input, ViewChild } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxUiLoaderRouterModule, NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';
import { AddressSelectComponent } from '../address-select/address-select.component';
import { AuthService } from '../services/auth.service';
import { OrderDetails } from '../models/userOrder';
import { OrderItem } from '../models/orderItem';
import { OrderService } from '../services/order.service';
import { OrderConfirmationComponent } from '../order-confirmation/order-confirmation.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule, AddressSelectComponent, OrderConfirmationComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  cart;
  totalAmount: number;
  discountOnMrp;
  totalMrp;
  deliveryFee;
  coupon: string;
  couponDiscount: number = 0;
  validCoupon: boolean = false;
  quantity: Array<number>;
  couponAmt: number;
  isAddressSelect: boolean = false;
  showOrderConfirmedPage: boolean = false;
  ordercreationInProgress: boolean = false;
  @ViewChild(AddressSelectComponent) addressComponent: AddressSelectComponent;

  constructor(
    private commonService: CommonService,
    private loaderService: NgxUiLoaderService,
    private authService: AuthService,
    private router: Router,
    private orderService: OrderService
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
    this.totalAmount = parseInt((total - (total * this.couponDiscount / 100)).toFixed(2));
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
          this.commonService.showToast({ message: `${this.couponDiscount}% off applied successfully!`, type: "success", timeout: 250 });
          this.validCoupon = true;
          this.calculatePriceDetails();
        }
        else {
          this.commonService.showToast({ message: `Invalid coupon!`, type: "error", timeout: 300 });
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

  createOrder() {
    this.ordercreationInProgress = true;
    this.loaderService.start();
    let orderDetails: OrderDetails = {
      totalAmount: this.totalAmount,
      deliveryFee: this.deliveryFee,
      mrp: this.totalMrp,
      discountOnMrp: this.discountOnMrp,
      couponDiscount: this.couponAmt,
      isCouponApplied: this.validCoupon
    }

    let orderItems: Array<OrderItem> = this.cart.map(item => {
      return {
        productId: item.product._id,
        sellerId: item.product.seller,
        quantity: item.userQuantity,
        mrp: item.product.price,
        itemTotal: item.product.price - (item.product.price * item.product.discountPercentage / 100),
        primaryImage: item.product.images[0],
        productName: item.product.productName
      }
    })

    let orderPayload = {
      userId: this.authService.currentUser()._id,
      buyerName: this.authService.currentUser().firstName + " " + this.authService.currentUser().lastName,
      buyerEmail: this.authService.currentUser().emailId,
      buyerContactNumber: this.authService.currentUser().phoneNumber,
      orderDetails: orderDetails,
      orderItems: orderItems,
      deliveryAddress: this.addressComponent.selectedAddress
    }
    this.orderService.createOrder(orderPayload).subscribe({
      next: (res) => {
        if (res['success']) {
          this.loaderService.stop();
          setTimeout(() => {
            this.ordercreationInProgress = false;
            this.showOrderConfirmedPage = true;
          }, 500)

        }
        else {
          this.loaderService.stop();
          this.ordercreationInProgress = false;
          this.commonService.showToast({ message: 'Something went wrong', type: "error" });
        }
      },
      error: () => {
        this.loaderService.stop();
        this.ordercreationInProgress = false;
        this.commonService.showToast({ message: 'Something went wrong', type: "error" });
      }
    })
  }

  toggleAddressSelect() {
    this.isAddressSelect = !this.isAddressSelect;
  }

}
