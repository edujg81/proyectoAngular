import { Component } from '@angular/core';
import { Restaurant } from '../services/models';
import { RestaurantService } from '../services/restaurant.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title: String = 'Restaurant reviews';
  isElevated: number = 0;

  restaurantList: Restaurant[] = [];

  constructor() {}

  ngOnInit() {
    const restaurantService = new RestaurantService();
    this.restaurantList = restaurantService.getRestaurants();
  }

  resaltar(id: number) {
    this.isElevated = id;
  }
}
