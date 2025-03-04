import { Component, OnInit, Signal, signal } from '@angular/core';
import { FruitService } from '../../service/fruit.service';
import { fruit } from '../../utils/fruit';

@Component({
  selector: 'app-fruit-list',
  templateUrl: './fruit-list.component.html',
  styleUrls: ['./fruit-list.component.scss'],
  standalone: false
})
export class FruitListComponent implements OnInit {

  constructor(private fruitService: FruitService) { }

  fruits: Signal<fruit[] | undefined> = signal([]);

  ngOnInit() {
    this.fruits = this.fruitService.fruits;
  }
}
