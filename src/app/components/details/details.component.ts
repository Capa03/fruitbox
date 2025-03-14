import { switchMap } from 'rxjs';
import { Component, OnInit, signal, Signal } from '@angular/core';
import { FruitService } from '../../service/fruit.service';
import { ActivatedRoute } from '@angular/router';
import { fruit } from '../../utils/fruit';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  standalone: false
})
export class DetailsComponent implements OnInit {

  constructor(private fruitService: FruitService, private route: ActivatedRoute) { }

  fruit: Signal<fruit | undefined> = signal<fruit | undefined>(undefined);

  ngOnInit() {
    const fruitId: number = Number(this.route.snapshot.paramMap.get('id'));
    this.fruit = this.fruitService.getFruitById(fruitId);
  }

}
