import { Component } from '@angular/core';
import { Restaurant } from '../services/models';
import { RestaurantService } from '../services/restaurant.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  restaurantList: Restaurant[] = [];

  constructor(private restaurantService: RestaurantService) {}

  ngOnInit() {
    this.restaurantList = this.restaurantService.getRestaurants();
  }
}
