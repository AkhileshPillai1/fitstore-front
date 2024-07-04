import { Component, Input, inject } from '@angular/core';
import { NgIf, NgFor, NgClass, DatePipe } from '@angular/common';
import { UpperCasePipe } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ProductService } from '../services/product.service';
import { CommonService } from '../services/common.service';
import { categoryEnum } from '..//constants';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Review } from '../models/review';
import { AuthService } from '../services/auth.service';
import { StarRatingComponent } from '../star-rating/star-rating.component';
import { ReadonlyStarComponent } from '../readonly-star/readonly-star.component';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [FormsModule, NgIf, NgFor, NgClass, UpperCasePipe, ReactiveFormsModule, StarRatingComponent, DatePipe, ReadonlyStarComponent],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {
  quantity: number = 1;
  categoryEnum;
  specs;
  gridClass;
  showModal:boolean = false;
  reviews:Array<Review>;
  private router = inject(Router);
  private authService = inject(AuthService);
  private formBuilder = inject(FormBuilder);
  reviewForm = this.formBuilder.group({
    comment: ['', Validators.required],
    stars: [0],
    userId:[''],
    commentDate:[''],
    isAnonymous:[false],
    name:[''],
    description:['']
  });
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
        this.product = res;
        this.specs =  Object.entries(this.product.specs);
        this.reviews = res["reviews"].reverse();
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

  openModal(){
    if(!this.authService.currentUser()){
      this.router.navigateByUrl('/login');
    }
    else{
      this.showModal = true;
    }
  }

  closeModal(){
    this.showModal = false;
    this.reviewForm.reset();
  }

  submitReview(){
    this.loaderService.start();
    this.productService.addReview(this.product["_id"],this.reviewForm.value).subscribe({
      next:(res)=>{
        if(res["success"]){
          this.showModal = false;
          this.loaderService.stop();
          this.commonService.showToast({ message: 'Review added!', type: "success", timeout:250});
          this.getProduct();
        }
        else{
          this.loaderService.stop();
          this.commonService.showToast({ message: 'Something went wrong, please try again later', type: "error", timeout:250 });
        }
      },
      error:()=>{
        this.loaderService.stop();
          this.commonService.showToast({ message: 'Something went wrong, please try again later', type: "error", timeout:250 });
      }
    });
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
