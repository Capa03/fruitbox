import { Component, computed, OnInit, signal, Signal } from '@angular/core';
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
  total: Signal<number> = signal<number>(0);

  ngOnInit() {
    this.cartItems = this.fruitService.cartList;
  }


  displayedColumns: string[] = ['name', 'quantity', 'price', 'actions'];

  increaseQuantity(item: cartItem) {
    this.fruitService.increaseCart(item);
  }

  decreaseQuantity(item: cartItem) {
    this.fruitService.decreaseCart(item);
  }

  removeItem(item: cartItem) {
    this.fruitService.removeItemCart(item);
  }

  clearCart() {
    this.fruitService.clearCart();
  }

  getTotalPrice() {
    this.total = computed(() => this.cartItems().length)
  }

  checkout() {
    alert('Proceeding to checkout!');
  }

}
