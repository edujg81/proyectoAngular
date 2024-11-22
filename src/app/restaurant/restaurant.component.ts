import { Component, Input, OnInit } from '@angular/core';
import { Restaurant } from '../../services/models';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss'],
})
export class RestaurantComponent implements OnInit {
  @Input()
  restaurant!: Restaurant;

  isElevated: number = 0;

  constructor() {}

  ngOnInit() {}

  resaltar(id: number) {
    this.isElevated = id;
  }
}
