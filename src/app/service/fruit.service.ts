import { cartItem, fruit } from './../utils/fruit';
import { HttpClient } from '@angular/common/http';
import { computed, effect, Injectable, Signal, signal } from '@angular/core';
import { catchError, filter, map, Observable, of, tap } from 'rxjs';
import { Result } from '../utils/response';
import { ServerService } from './server.service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})

export class FruitService {
  private fruitsResult: Signal<Result<fruit[]> | undefined> = signal(undefined);
  private cart = signal<cartItem[]>([]);

  readonly fruits = computed(() => this.fruitsResult()?.data);
  readonly fruitsError = computed(() => this.fruitsResult()?.error);
  readonly cartCount = computed(() => this.cart().length);
  readonly cartList = computed(() => this.cart());

  constructor(private http: HttpClient, private url: ServerService) {
    this.fruitsResult = toSignal(this.getFruits());
    effect(() => console.log('Cart:', this.cart()));
  }


  private getFruits(): Observable<Result<fruit[]>> {
    return this.http.get<fruit[]>(this.url.getFruits()).pipe(
      map(fruits => ({ data: fruits } as Result<fruit[]>)),
      catchError(error => of({ data: [], error } as Result<fruit[]>))
    );
  }

  addFruitToCart(fruit: fruit) {

    this.cart.update((oldCart) => {
      const existingItem = oldCart.find(f => f.id === fruit.id);
      if (!existingItem) {
        return [...oldCart, {
          id: fruit.id,
          name: fruit.name,
          price: fruit.price,
          quantity: 1
        }];
      }

      return oldCart.map(item =>
        item.id === fruit.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    });
  }


  increaseCart(item: cartItem) {
    this.cart.update((oldCart) =>
      oldCart.map(c =>
        c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c
      )
    );
  }

  decreaseCart(item: cartItem) {
    this.cart.update((oldCart) =>
      oldCart.map(c =>
        c.id === item.id ? { ...c, quantity: c.quantity - 1 } : c
      )
    );
  }

  removeItemCart(item: cartItem) {
    this.cart.update((oldCart) => oldCart.filter(c => c.id !== item.id));
  }

  clearCart()
  {
    this.cart.set([]);
  }
}
