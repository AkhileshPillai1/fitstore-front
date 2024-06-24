import { Component } from '@angular/core';
import { NgIf, NgStyle } from '@angular/common';
import { Subscription } from 'rxjs';
import { CommonService } from '../services/common.service';
import { ToastMessage } from '../models/toast';

@Component({
  selector: 'app-toast-message',
  standalone: true,
  imports: [NgIf,NgStyle],
  templateUrl: './toast-message.component.html',
  styleUrl: './toast-message.component.css'
})
export class ToastMessageComponent {
  message: string = '';
  show: boolean = false;
  backgroundColor:string = "green";
  private toastSubscription: Subscription = new Subscription();

  constructor(private commonService: CommonService) {}

  ngOnInit(): void {
    this.toastSubscription = this.commonService.toastState.subscribe((toastMessage: ToastMessage) => {
      this.message = toastMessage.message;
      if(toastMessage.type === "error"){
        this.backgroundColor = "red";
      }
      else if(toastMessage.type === "success"){
        this.backgroundColor = "green";
      }
      if(toastMessage.timeout && toastMessage.timeout != 0){
        setTimeout(()=>{
          this.show = true;
        },toastMessage.timeout);
      }
      else{
        this.show = true;
      }
      setTimeout(() => {
        this.show = false;
      }, 3000);
    });
  }

  ngOnDestroy(): void {
    this.toastSubscription.unsubscribe();
  }
}
