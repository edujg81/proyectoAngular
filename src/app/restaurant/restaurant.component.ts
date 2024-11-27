import { Component, Input, OnInit } from '@angular/core';
import { RestaurantService } from '../../services/restaurant.service';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss'],
})
export class RestaurantComponent implements OnInit {
  // Recibe el restaurante como input(parámetro) desde otro componente
  @Input() restaurant!: any;

  // Variable para guardar el id del restaurante que se debe resaltar. Se inicializa a cero para que no se resalte ninguna tarjeta por defecto.
  isElevated: number = 0;

  constructor(private restaurantService: RestaurantService) {}

  ngOnInit() {}

  // Metodo encargado de indicar que se debe resaltar la tarjeta
  resaltar(id: number) {
    this.isElevated = id;
  }

  // Metodo encargado de eliminar el restaurante
  deleteRestaurant(id: number): void {
    this.restaurantService.deleteRestaurant(id).subscribe({
      next: () => {
        console.log('Se ha borrado el restaurante con ID: ' + id);
        this.restaurantService.sendData.next(true);
      },
      error: (error: string) =>
        console.error('Error al borrar el restaurante: ' + error),
    });
  }
}
