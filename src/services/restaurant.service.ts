import { Injectable } from '@angular/core';
import { RESTAURANT_LIST } from './mocks';

@Injectable({
  providedIn: 'root',
})
export class RestaurantService {
  constructor() {}

  getRestaurants() {
    return RESTAURANT_LIST;
  }

  getRestaurantById(id: number) {
    return RESTAURANT_LIST.find((restaurant) => restaurant.id === id);
  }
}
