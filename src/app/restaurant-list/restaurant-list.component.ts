import { Component } from '@angular/core';
import { RestaurantService } from '../../services/restaurant.service';
import { Restaurant } from '../../services/models';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrl: './restaurant-list.component.scss'
})
export class RestaurantListComponent {
  title = 'Restaurants reviews';
  restaurantList: Restaurant[] = [];

  constructor(private restaurantService: RestaurantService) {}

  ngOnInit() {
    //this.restaurantList = this.restaurantService.getRestaurants();
    this.restaurantService.getRestaurantsHttp().subscribe({
      next: (data) => {
        this.restaurantList = data;
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        console.log('complete');
      },
    });
  }
}
