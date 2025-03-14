import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FruitListComponent } from './components/fruit-list/fruit-list.component';
import { CartComponent } from './components/cart/cart.component';
import { DetailsComponent } from './components/details/details.component';

export enum ROUTE_PATH {
  FRUITS = '/fruits',
  DETAILS = '/details/:id',
  CART = '/cart'
}

const routes: Routes = [
  { path: 'cart', component: CartComponent },
  { path: 'fruits', component: FruitListComponent },
  { path: 'details/:id', component: DetailsComponent},
  { path: '', redirectTo: '/fruits', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
