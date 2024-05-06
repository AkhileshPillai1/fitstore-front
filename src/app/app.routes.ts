import { Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { ProductsComponent } from './products/products.component';

export const routes: Routes = [
    {path: 'cart', component: CartComponent},
    {path: 'products', component: ProductsComponent},
];
