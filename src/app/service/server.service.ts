import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  private BASE_URL = 'http://localhost:3000/api';

  getFruits(): string {
    return this.BASE_URL + '/fruits';
  }
}
