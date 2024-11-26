import { Component, OnInit } from '@angular/core';
import { Restaurant } from '../../services/models';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { RestaurantService } from '../../services/restaurant.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { of } from 'rxjs';

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

  constructor(
    private fb: FormBuilder,
    private restaurantService: RestaurantService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.restaurant! = null as unknown as Restaurant; // Initialize with null

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
  ngOnInit(): void {
    this.restaurantId = +this.route.snapshot.paramMap.get('id')!;

    if (this.restaurantId) {
      this.route.paramMap.subscribe((params: ParamMap) => {
        this.restaurant = this.restaurantService.getRestaurantById(
          this.restaurantId!
        );

        this.createRestaurantForm.patchValue(this.restaurant!);
        this.isEdit = true;
        this.title = 'Editar restaurante';
      });
    }
  }

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

  send() {
    console.log(this.createRestaurantForm.value);

    // Se asignan los valores del formulario al objeto restaurant
    this.restaurant = this.createRestaurantForm.value;

    if (this.createRestaurantForm.valid) {
      const control = this.restaurantService.createRestaurant(this.restaurant!);

      if (control) {
        console.log('Restaurante creado');
        console.log(this.restaurant);
      } else {
        console.log('Error al crear restaurante');
      }
    }
  }
}
