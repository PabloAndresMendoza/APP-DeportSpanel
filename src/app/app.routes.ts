import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Home } from './home/home';
import { Dashboard } from './dashboard/dashboard';
import { Product } from './product/product';
import { User } from './user/user';

export const routes: Routes = [
  { path: 'home', component: Home },
  { path: 'login', component: Login },
  { path: 'dashboard', component: Dashboard },
  { path: 'product', component: Product },
  { path: 'user', component: User },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];
