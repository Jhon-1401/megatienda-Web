import { Routes } from '@angular/router';
import { LoginComponent } from './modules/auth/pages/login/login.component';
import { RegisterComponent } from './modules/auth/pages/register/register.component';
import { ProductCatalogComponent } from './modules/products/product-catalog/product-catalog.component';
import { adminGuard } from './core/guards/admin.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'catalogo', pathMatch: 'full' },

  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/register', component: RegisterComponent },

  { path: 'catalogo', component: ProductCatalogComponent },

  {
    path: 'admin',
    loadComponent: () =>
      import('./modules/admin/pages/admin/admin.component').then(
        (m) => m.AdminComponent,
      ),
    canActivate: [adminGuard],
  },

  {
    path: 'cart',
    loadComponent: () =>
      import('./modules/cart/cart/cart.component').then((m) => m.CartComponent),
  },
  {
  path: 'checkout',
  loadComponent: () =>
    import('./modules/checkout/pages/checkout/checkout.component')
      .then(m => m.CheckoutComponent)
}
];
