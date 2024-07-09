import { Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { ProductsComponent } from './products/products.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { LoginComponent } from './login/login.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';

export const routes: Routes = [
    { path: 'cart', component: CartComponent },
    { path: 'products', component: ProductsComponent },
    { path: 'detail/:id', component: ProductDetailComponent },
    { path: 'login', component: LoginComponent },
    { path: 'myprofile', component: EditProfileComponent }
];
