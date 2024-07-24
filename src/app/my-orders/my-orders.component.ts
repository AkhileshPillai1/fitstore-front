import { Component, inject } from '@angular/core';
import { OrderService } from '../services/order.service';
import { UserOrder } from '../models/userOrder';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-my-orders',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.css'
})
export class MyOrdersComponent {
  orderService = inject(OrderService);
  orders:Array<UserOrder>;
  sortDate:number=3;

  ngOnInit(){
    this.fetchOrder();
  }

  fetchOrder(){
    this.orderService.getOrders(this.sortDate).subscribe({
      next:(res)=>{
        this.orders = res;
      }
    });
  }
}
