import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FruitListComponent } from './components/fruit-list/fruit-list.component';
import { CartComponent } from './components/cart/cart.component';


const routes: Routes = [
  { path: 'cart', component: CartComponent },
  { path: 'fruits', component: FruitListComponent },
  { path: '', redirectTo: '/fruits', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
