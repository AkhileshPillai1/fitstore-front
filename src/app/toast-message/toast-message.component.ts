import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { Subscription } from 'rxjs';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-toast-message',
  standalone: true,
  imports: [NgIf],
  templateUrl: './toast-message.component.html',
  styleUrl: './toast-message.component.css'
})
export class ToastMessageComponent {
  message: string = '';
  show: boolean = false;
  private toastSubscription: Subscription = new Subscription();

  constructor(private commonService: CommonService) {}

  ngOnInit(): void {
    this.toastSubscription = this.commonService.toastState.subscribe((toastMessage: string) => {
      this.message = toastMessage;
      this.show = true;
      setTimeout(() => {
        this.show = false;
      }, 3000);
    });
  }

  ngOnDestroy(): void {
    this.toastSubscription.unsubscribe();
  }
}
