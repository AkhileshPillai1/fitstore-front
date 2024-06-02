import { Component } from '@angular/core';
import { UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { ProductService } from '../product.service';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [UpperCasePipe,FormsModule,NgFor, NgIf,ProductDetailComponent,RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  constructor(private productService: ProductService, private router: Router) {}
  title = "Fit shop";
  products = [];
  selectedProduct;

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getProducts().subscribe(res=>{
      this.products = res;
    });
  }

  openProductDetail(productId){
    console.log(productId)
    this.router.navigate(['/detail/', productId])
  }

}
