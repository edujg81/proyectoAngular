import { Component, OnInit } from '@angular/core';
import { Restaurant } from '../../services/models';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { RestaurantService } from '../../services/restaurant.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-create-restaurant',
  templateUrl: './create-restaurant.component.html',
  styleUrl: './create-restaurant.component.scss',
})
export class CreateRestaurantComponent implements OnInit {
  title = 'Registrar restaurante';
  restaurant!: Restaurant | undefined | null;
  restaurantId!: number | null;
  isEdit = false;
  createRestaurantForm!: FormGroup;

  // Método constructor encargado de definir el formulario
  constructor(
    private fb: FormBuilder,
    private restaurantService: RestaurantService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // Se inicializa la variable "restaurant" a null, indicando que puede ser de tipo unknown(desconocido) o Restaurant
    this.restaurant! = null as unknown as Restaurant; // Initialize with null

    // Definición del FormGroup
    this.createRestaurantForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      neighborhood: ['', [Validators.required]],
      photograph: ['', [Validators.required]],
      address: ['', [Validators.required]],
      cuisine_type: ['', [Validators.required]],
      latlng: this.fb.group({
        lat: ['', [Validators.required]],
        lng: ['', [Validators.required]],
      }),
      operating_hours: this.fb.group({
        Monday: ['', [Validators.required, this.validateOperatingHours]],
        Tuesday: ['', [Validators.required, this.validateOperatingHours]],
        Wednesday: ['', [Validators.required, this.validateOperatingHours]],
        Thursday: ['', [Validators.required, this.validateOperatingHours]],
        Friday: ['', [Validators.required, this.validateOperatingHours]],
        Saturday: ['', [Validators.required, this.validateOperatingHours]],
        Sunday: ['', [Validators.required, this.validateOperatingHours]],
      }),
    });
  }

  // Metodo encargado de inicializar el componente. Si existe un id en la url, se obtiene el restaurante correspondiente
  ngOnInit(): void {
    // Obtenemos el id de la url
    this.restaurantId = +this.route.snapshot.paramMap.get('id')!;

    // Si el id de la url es distinto de null, obtenemos el restaurante
    if (this.restaurantId) {
      this.route.paramMap.subscribe((params: ParamMap) => {
        this.restaurantService
          .getRestaurantByIdHttp(this.restaurantId!)
          .subscribe({
            next: (data) => {
              // Se informa la variable "restaurant" con los datos obtenidos
              this.restaurant = data;
              // Se cargan los datos en el formulario
              this.createRestaurantForm.patchValue(this.restaurant!);
              // Se indica que estamos editando
              this.isEdit = true;
              // Se cambia el título
              this.title = 'Editar restaurante';
            },
            error: (error) => {
              console.log(error);
            },
          });
      });
    }
  }

  // Metodo encargado de validar el formato de las horas
  validateOperatingHours(
    control: AbstractControl
  ): { [key: string]: any } | null {
    const pattern =
      '^\\d?\\d:\\d?\\d (pm|am) - \\d?\\d:\\d?\\d (pm|am)(, \\d?\\d:\\d?\\d (pm|am) - \\d?\\d:\\d?\\d (pm|am))?$';
    const regex = new RegExp(pattern);
    const value = control.value;
    const isValid = regex.test(value);
    if (isValid) {
      return null;
    } else {
      return { wrong_operating_hours: 'Wrong format' };
    }
  }

  // Metodo encargado de enviar los datos
  send() {
    // Si el formulario es válido (datos informados correctos)
    if (this.createRestaurantForm.valid) {
      // Si estamos editando, se llama al servicio para actualizar el restaurante
      if (this.isEdit) {
        this.restaurantService
          .editRestaurant(this.restaurantId!, this.createRestaurantForm.value!)
          .subscribe({
            next: (data) => {
              this.restaurantService.sendData.next(true);
              console.log('Restaurante editado: ' + data);
            },
            error: (error) => {
              console.log('Error al editar restaurante: ' + error);
            },
          });
      }
      // Si no estamos editando, se llama al servicio para crear el restaurante
      else {
        this.restaurantService
          .createRestaurantHttp(this.createRestaurantForm.value!)
          .subscribe({
            next: (data) => {
              this.restaurantService.sendData.next(true);
              console.log('Restaurante creado: ' + data);
            },
            error: (error) => {
              console.log('Error al crear restaurante: ' + error);
            },
          });
      }
      // Se redirige a la lista de restaurantes
      this.router.navigate(['/restaurants']);
    }
  }
}
