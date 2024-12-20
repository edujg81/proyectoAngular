import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Restaurant } from '../../services/models';
import { RestaurantService } from '../../services/restaurant.service';

@Component({
  selector: 'app-restaurant-detail',
  templateUrl: './restaurant-detail.component.html',
  styleUrl: './restaurant-detail.component.scss',
})
export class RestaurantDetailComponent implements OnInit {
  title = 'Restaurant detail';
  restaurant!: Restaurant | undefined;

  constructor(
    private route: ActivatedRoute,
    private restaurantService: RestaurantService
  ) {}

  ngOnInit(): void {
    // Sacamos el id de la url y se cargan los datos del restaurante correspondiente
    this.route.paramMap.subscribe((params: ParamMap) => {
      // LOCAL
      // this.restaurant = this.restaurantService.getRestaurantById(
      //   Number(params.get('id'))
      // );

      // SERVIDOR
      this.restaurantService
        .getRestaurantByIdHttp(Number(params.get('id')))
        .subscribe({
          next: (data) => {
            this.restaurant = data;
          },
          error: (error) => {
            console.log(error);
          },
        });
    });
  }
}
