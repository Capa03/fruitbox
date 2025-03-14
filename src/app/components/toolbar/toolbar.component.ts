import { Component, OnDestroy, OnInit, Signal, signal } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { FruitService } from '../../service/fruit.service';
import { ROUTE_PATH } from '../../app-routing.module';


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  standalone: false
})

export class ToolbarComponent implements OnInit {
  cartCount: Signal<number> = signal<number>(0);
  searchBox: string = "";
  searchState: Signal<boolean> = signal<boolean>(true);

  constructor(private route: Router, private fruitService: FruitService) { }

  ngOnInit(): void {
    this.cartCount = this.fruitService.getCartCount();
    this.route.events.subscribe(event => {
      this.searchBarState(event);
    });
    this.searchState = this.fruitService.getHomeState();
  }

  onSearch(event: any) {
    this.fruitService.filterFruit(event.target.value);
  }

  onCartClick() {
    this.route.navigate(['/cart']);
  }



  searchBarState(event: any) {
    if (event instanceof NavigationStart) {
      if (event.url === ROUTE_PATH.FRUITS) {
        this.fruitService.inHomePage()
      } else {
        this.fruitService.notHomePage()
      }
    }
  }

}
