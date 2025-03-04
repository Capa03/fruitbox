import { HttpClient } from '@angular/common/http';
import { computed, Injectable, Signal, signal } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { fruit } from '../utils/fruit';
import { Result } from '../utils/response';
import { ServerService } from './server.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})

export class FruitService {
  private fruitsResult: Signal<Result<fruit[]> | undefined> = signal(undefined);

  constructor(private http: HttpClient, private url: ServerService) {
      this.fruitsResult = toSignal(this.getFruits());
  }


  readonly fruits = computed(() => this.fruitsResult()?.data);
  readonly fruitsError = computed(() => this.fruitsResult()?.error);

  private getFruits(): Observable<Result<fruit[]>> {
    return this.http.get<fruit[]>(this.url.getFruits()).pipe(
      map(fruits => ({ data: fruits } as Result<fruit[]>)),
      catchError(error => of({ data: [], error } as Result<fruit[]>))
    );
  }

}
