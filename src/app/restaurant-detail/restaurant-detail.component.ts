import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Restaurant } from '../../services/models';
import { RestaurantService } from '../../services/restaurant.service';

@Component({
  selector: 'app-restaurant-detail',
  templateUrl: './restaurant-detail.component.html',
  styleUrl: './restaurant-detail.component.scss',
})
export class RestaurantDetailComponent implements OnInit {
  restaurant!: Restaurant | undefined;

  constructor(
    private route: ActivatedRoute,
    private restaurantService: RestaurantService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Sacamos el id de la url
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.restaurant = this.restaurantService.getRestaurantById(
        Number(params.get('id'))
      );
    });
  }
}
