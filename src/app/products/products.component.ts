import { Component, inject } from '@angular/core';
import { UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf, NgClass } from '@angular/common';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { ProductService } from '../services/product.service';
import { RouterLink, Router } from '@angular/router';
import { CommonService } from '../services/common.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [UpperCasePipe, FormsModule, NgFor, NgClass, NgIf, ProductDetailComponent, RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  constructor(private productService: ProductService, private router: Router) { }
  commonService = inject(CommonService);
  loaderService = inject(NgxUiLoaderService);
  title = "Fit shop";
  products = [];
  selectedProduct;
  show:boolean=false;

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getProducts().subscribe(res => {
      this.products = res;
    });
  }

  getBackgroundClass(rating: number) {
    if (rating >= 4)
      return 'bg-green';
    else if (rating >= 2.5)
      return 'bg-yellow';
    else
      return 'bg-red';
  }

  openProductDetail(productId) {
    this.router.navigate(['/detail/', productId])
  }

  addToCart(productId) {
    this.loaderService.start();
    let cartObject = {
      productId: productId,
      quantity: 1
    };
    this.commonService.addToCart(cartObject)
      .subscribe({
        next: (res) => {
          if (res["success"]) {
            this.loaderService.stop();
            this.commonService.showToast({ message: 'Added to cart!', type: "success", timeout:250});
          }
        },
        error: () => {
          this.loaderService.stop();
          this.commonService.showToast({ message: 'Something went wrong, please try again later', type: "error", timeout:250 });
        }
      });
  }

}
