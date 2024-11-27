import { Component } from '@angular/core';
import { RestaurantService } from '../../services/restaurant.service';
import { Restaurant } from '../../services/models';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrl: './restaurant-list.component.scss',
})
export class RestaurantListComponent {
  title = 'Restaurants reviews';
  restaurantList: Restaurant[] = [];

  constructor(private restaurantService: RestaurantService) {}

  ngOnInit() {
    // Cargamos los restaurantes
    this.loadRestaurants();

    // Nos suscribimos al observable que nos indica si hay cambios en la lista de restaurantes y los recargamos
    this.restaurantService.getSendDataObservable().subscribe((data) => {
      this.loadRestaurants();
    });
  }

  // Metodo encargado de cargar los restaurantes
  loadRestaurants() {
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
