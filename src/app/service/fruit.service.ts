import { HttpClient } from '@angular/common/http';
import { computed, effect, Injectable, Signal, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, map, Observable, of } from 'rxjs';
import { Result } from '../utils/response';
import { cartItem, fruit } from './../utils/fruit';
import { ServerService } from './server.service';

@Injectable({
  providedIn: 'root'
})

export class FruitService {
  private fruitsResult: Signal<Result<fruit[]> | undefined> = signal(undefined);
  private cart = signal<cartItem[]>([]);
  private searchBox = signal<string>("");
  private readonly fruits = this.getFruits();

  private homeState = signal<boolean>(false);

  getHomeState(): Signal<boolean> {
    return this.homeState;
  }

  notHomePage(): void {
    this.homeState.set(false);
  }

  inHomePage(): void {
    this.homeState.set(true);
  }

  constructor(private http: HttpClient, private url: ServerService) {
    this.fruitsResult = toSignal(this.fetchFruits());
  }

  getFruits(): Signal<fruit[] | undefined> {
    return computed(() => this.fruitsResult()?.data);
  }

  getFruitsError(): Signal<any> {
    return computed(() => this.fruitsResult()?.error);
  }

  getCartCount(): Signal<number> {
    return computed(() => this.cart().length);
  }

  getCartList(): Signal<cartItem[] | undefined> {
    return computed(() => this.cart());
  }

  getFiltredFruits(): Signal<fruit[]> {
    return computed(() =>
      this.fruits()?.filter(f =>
        f.name.toLowerCase().includes(this.searchBox().toLowerCase())) || []
    );
  }

  getFruitById(id: number): Signal<fruit | undefined> {
    return computed(() => this.fruits()?.find(f => f.id === id));
  }

  addFruitToCart(fruit: fruit): void {
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


  increaseCart(item: cartItem): void {
    this.cart.update((oldCart) =>
      oldCart.map(c =>
        c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c
      )
    );
  }

  decreaseCart(item: cartItem): void {
    this.cart.update((oldCart) =>
      oldCart.map(c =>
        c.id === item.id ? { ...c, quantity: c.quantity - 1 } : c
      )
    );
  }

  removeItemCart(item: cartItem): void {
    this.cart.update((oldCart) => oldCart.filter(c => c.id !== item.id));
  }

  clearCart(): void {
    this.cart.set([]);
  }

  filterFruit(name: string):void {
    this.searchBox.set(name);
  }

  private fetchFruits(): Observable<Result<fruit[]>> {
    return this.http.get<fruit[]>(this.url.getFruits()).pipe(
      map(fruits => ({ data: fruits } as Result<fruit[]>)),
      catchError(error => of({ data: [], error } as Result<fruit[]>))
    );
  }
}
