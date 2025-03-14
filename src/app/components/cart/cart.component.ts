import { Component, computed, effect, OnInit, signal, Signal } from '@angular/core';
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

  cartItems: Signal<cartItem[] | undefined> = signal<cartItem[] | undefined>([]);

  readonly total = computed(() =>
    this.cartItems()?.reduce((sum, c) => sum + c.price * c.quantity, 0)
  );

  ngOnInit() {
    this.fruitService.notHomePage();
    this.cartItems = this.fruitService.getCartList();
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

  checkout() {
    alert('Proceeding to checkout!');
  }

}
