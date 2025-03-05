import { Component, computed, effect, OnInit, Signal, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FruitService } from '../../service/fruit.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  standalone: false
})

export class ToolbarComponent implements OnInit {
  cartCount: Signal<number> = signal<number>(0);
  searchBox: string = "";

  constructor(private route: Router, private fruitService: FruitService) {
    effect(() => console.log('Cart toolbar:', this.cartCount()));
  }

  ngOnInit(): void {
    this.cartCount = this.fruitService.cartCount;
  }

  onSearch(event: any) {
    this.fruitService.filterFruit(event.target.value);
  }

  onCartClick() {
    this.route.navigate(['/cart']);
  }
}
