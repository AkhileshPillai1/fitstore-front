import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';
import { UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ProductService } from '../product.service';

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
        console.log(this.product)
      });
  }

  goBack(): void {
    this.location.back();
  }

  addQuantity() {
    this.quantity++;
  }

  removeQuantity() {
    this.quantity--;
  }

  getCartValue() {
    console.log(this.quantity)
  }
}
