import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';
import { UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ProductService } from '../services/product.service';
import { CommonService } from '../services/common.service';
import { categoryEnum } from '..//constants';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [FormsModule, NgIf, UpperCasePipe],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {
  quantity: number = 1;
  categoryEnum;
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private commonService: CommonService,
    private location: Location,
    private loaderService: NgxUiLoaderService
  ) { }
  @Input() product;

  ngOnInit(): void {
    this.getProduct();
    this.categoryEnum = categoryEnum
  }

  getProduct(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.productService.getProduct(id)
      .subscribe((res) => {
        this.product = res
      });
  }

  goBack(): void {
    this.location.back();
  }

  addQuantity() {
    this.quantity++;
  }

  removeQuantity() {
    if (this.quantity > 1)
      this.quantity--;
  }



  addProductToCart() {
    this.loaderService.start();
    let cartObject = {
      productId: this.product._id,
      quantity: this.quantity
    };
    this.commonService.addToCart(cartObject)
      .subscribe({
        next: (res) => {
          if (res["success"]) {
            this.commonService.showToast({message:'Added to cart!',type:"success", timeout:250});
          }
          this.loaderService.stop();
        },
        error: () => {
            this.commonService.showToast({message:'Something went wrong, please try again later',type:"error", timeout:250});
            this.loaderService.stop();
        }
      });
  }
}
