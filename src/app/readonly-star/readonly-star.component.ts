import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-readonly-star',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './readonly-star.component.html',
  styleUrl: './readonly-star.component.css'
})
export class ReadonlyStarComponent {
  @Input() stars: number;
  arr = Array(5).fill(1);
  gradientStyle: string = 'linear-gradient(to right, #EAB308 50%, #D1D5DB 50%)';
  additionalStyles: any = {
    'background-clip': 'border-box',
    '-webkit-background-clip': 'text',
    '-webkit-text-fill-color': 'transparent',
    'transition': 'none'
  };

  ngOnInit() {
    this.arr.fill(0, Math.floor(this.stars), 5);
    if (!Number.isInteger(this.stars)){
      let deltaValueForHalfStar = (this.stars - Math.floor(this.stars));
      this.arr[Math.floor(this.stars)] = deltaValueForHalfStar;
      this.gradientStyle = `linear-gradient(to right, #EAB308 ${deltaValueForHalfStar*100}%, #D1D5DB ${deltaValueForHalfStar*100}%)`;
    }
  }
}
