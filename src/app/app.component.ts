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

  constructor(private restaurantService: RestaurantService) {}

  ngOnInit() {
    this.restaurantList = this.restaurantService.getRestaurants();
  }

  resaltar(id: number) {
    this.isElevated = id;
  }
}
