import { Component, inject } from '@angular/core';
import { UpperCasePipe } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgFor, NgIf, NgClass } from '@angular/common';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { ProductService } from '../services/product.service';
import { RouterLink, Router } from '@angular/router';
import { CommonService } from '../services/common.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [UpperCasePipe, FormsModule, NgFor, NgClass, NgIf, ProductDetailComponent, RouterLink, ReactiveFormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  constructor(private productService: ProductService, private router: Router) { }
  commonService = inject(CommonService);
  loaderService = inject(NgxUiLoaderService);
  formBuilder = inject(FormBuilder);

  title = "Fit shop";
  products = [];
  selectedProduct;

  sortByOptions = [
    { label: "Price High to Low", value: "price#-1" },
    { label: "Price Low to High", value: "price#1" },
    { label: "Rating High to Low", value: "rating#-1" }
  ];
  discountOptions = [
    { label: "10% and above", value: "10" },
    { label: "20% and above", value: "20" },
    { label: "30% and above", value: "30" },
    { label: "40% and above", value: "40" }
  ];
  ratingsOptions = [
    { label: "4 and above", value: "4" },
    { label: "3 and above", value: "3" },
    { label: "2 and above", value: "2" }
  ];
  categoryOptions = [
    { label: "Protein", value: "1" },
    { label: "Fit Food", value: "2" },
    { label: "Pre/Post workout", value: "3" },
    { label: "Supplements", value: "4" },
    { label: "Equipment", value: "5" }
  ];

  filterControl = {
    sortBy: false,
    discount: false,
    rating: false,
    category: false
  }

  filterForm = this.formBuilder.nonNullable.group({
    sortBy: [''],
    discount: [''],
    rating: [''],
    category: ['']
  });

  ngOnInit(): void {
    this.getProducts();
    this.addListenerForFilterForm();
  }

  addListenerForFilterForm() {
    this.filterForm.valueChanges.subscribe({
      next: () => {
        this.getProducts(this.filterForm.value);
      }
    })
  }

  resetFilters() {
    this.filterForm.reset();
    console.log(this.filterForm)
    this.getProducts();
  }

  getProducts(filters = {}): void {
    this.productService.getProducts(filters).subscribe(res => {
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
            this.commonService.showToast({ message: 'Added to cart!', type: "success", timeout: 250 });
          }
        },
        error: () => {
          this.loaderService.stop();
          this.commonService.showToast({ message: 'Something went wrong, please try again later', type: "error", timeout: 250 });
        }
      });
  }

}
