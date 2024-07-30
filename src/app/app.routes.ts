import { Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { ProductsComponent } from './products/products.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { LoginComponent } from './login/login.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { RegisterComponent } from './register/register.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SellerComponent } from './seller/seller.component';
import { SellerOrdersComponent } from './seller-orders/seller-orders.component';
import { InventoryComponent } from './inventory/inventory.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'cart', component: CartComponent },
    { path: 'products', component: ProductsComponent },
    { path: 'detail/:id', component: ProductDetailComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'myprofile', component: EditProfileComponent },
    { path: 'myorders', component: MyOrdersComponent },
    {
        path: 'seller', component: SellerComponent, children: [
            { path: 'dashboard', component: DashboardComponent },
            { path: 'orders', component: SellerOrdersComponent },
            { path: 'inventory', component: InventoryComponent }
        ]
    }
];
