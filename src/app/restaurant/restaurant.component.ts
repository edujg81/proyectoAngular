import { Component, Input, OnInit } from '@angular/core';
import { Restaurant } from '../../services/models';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss'],
})
export class RestaurantComponent implements OnInit {
  @Input() restaurant!: any;
  
  isElevated: number = 0;
  restaurantService: any;

  constructor() {}

  ngOnInit() {}

  resaltar(id: number) {
    this.isElevated = id;
  }

  deleteRestaurant(id: number) {
    this.restaurantService.deleteRestaurant(id).subscribe(() => {
      console.log('Se ha borrado el restaurante');
    });
  }
}
