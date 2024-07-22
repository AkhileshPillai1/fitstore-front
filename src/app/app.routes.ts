import { Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { ProductsComponent } from './products/products.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { LoginComponent } from './login/login.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { RegisterComponent } from './register/register.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';

export const routes: Routes = [
    { path: 'cart', component: CartComponent },
    { path: 'products', component: ProductsComponent },
    { path: 'detail/:id', component: ProductDetailComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'myprofile', component: EditProfileComponent },
    { path: 'myorders', component: MyOrdersComponent}
];
