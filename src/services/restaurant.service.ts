import { Injectable } from '@angular/core';
import { RESTAURANT_LIST } from './mocks';
import { Restaurant } from './models';

@Injectable({
  providedIn: 'root',
})
export class RestaurantService {
  constructor() {}

  getRestaurants() {
    return RESTAURANT_LIST;
  }

  getRestaurantById(id: number) {
    return id > 0 && id < 11 ? RESTAURANT_LIST[id - 1] : undefined;
  }
}
