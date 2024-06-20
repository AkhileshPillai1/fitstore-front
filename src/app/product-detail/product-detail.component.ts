import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';
import { UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ProductService } from '../services/product.service';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [FormsModule, NgIf, UpperCasePipe],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {
  quantity: number = 1;
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private commonService: CommonService,
    private location: Location
  ) { }
  @Input() product;

  ngOnInit(): void {
    this.getProduct();
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
    let cartObject = {
      productId: this.product._id,
      quantity: this.quantity
    };
    this.commonService.addToCart(cartObject)
      .subscribe({
        next: (res) => {
          if (res["success"]) {
            this.commonService.showToast({message:'Added to cart!',type:"success"});
          }
        },
        error: () => {
            this.commonService.showToast({message:'Something went wrong, please try again later',type:"error"});
        }
      });
  }
}
