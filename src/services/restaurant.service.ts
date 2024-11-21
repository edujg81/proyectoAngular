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

  getRestaurantById(id: number): Restaurant[] {
    return RESTAURANT_LIST;
  }
}
