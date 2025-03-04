import { Component, OnInit, signal, Signal } from '@angular/core';
import { cartItem } from '../../utils/fruit';
import { FruitService } from '../../service/fruit.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  standalone: false
})
export class CartComponent implements OnInit {

  constructor(private fruitService: FruitService) { }

  cartItems: Signal<cartItem[]> = signal<cartItem[]>([]);

  ngOnInit() {
    this.cartItems = this.fruitService.cartList;
  }


  displayedColumns: string[] = ['name', 'quantity', 'price', 'actions'];

  increaseQuantity(item: cartItem) {
    item.quantity++;
  }

  decreaseQuantity(item: cartItem) {

  }

  removeItem(item: cartItem) {

  }

  clearCart() {

  }

  getTotalPrice(): number {
    return 0;
  }

  checkout() {
    alert('Proceeding to checkout!');
  }

}
