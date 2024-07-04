import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-star-rating',
  standalone: true,
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css'],
  imports: [CommonModule, ReactiveFormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => StarRatingComponent),
      multi: true
    }
  ]
})
export class StarRatingComponent implements ControlValueAccessor {
  @Input() maxStars = 5;
  stars: boolean[] = Array(this.maxStars).fill(false);
  onChange = (rating: number) => {};
  onTouched = () => {};

  setRating(rating: number) {
    this.stars = this.stars.map((_, i) => i < rating);
    this.onChange(rating);
    this.onTouched();
  }

  writeValue(rating: number): void {
    this.stars = this.stars.map((_, i) => i < rating);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
