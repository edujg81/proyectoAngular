import { Component, OnInit } from '@angular/core';
import { Restaurant } from '../../services/models';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { RestaurantService } from '../../services/restaurant.service';
import { PrintHook } from '@angular/flex-layout';

@Component({
  selector: 'app-create-restaurant',
  templateUrl: './create-restaurant.component.html',
  styleUrl: './create-restaurant.component.scss',
})
export class CreateRestaurantComponent implements OnInit {
  title = "Registrar restaurante"

  restaurant!: Restaurant;

  createRestaurantForm: FormGroup;

  constructor(private fb: FormBuilder, private restaurantService : RestaurantService) {
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
        Monday: ['', [Validators.required]],
        Tuesday: ['', [Validators.required]],
        Wednesday: ['', [Validators.required]],
        Thursday: ['', [Validators.required]],
        Friday: ['', [Validators.required]],
        Saturday: ['', [Validators.required]],
        Sunday: ['', [Validators.required]],
      }),
    });
  }
  ngOnInit(): void {

  }
  send() {
    console.log(this.createRestaurantForm.value);

    this.restaurant = this.createRestaurantForm.value;

    if (this.createRestaurantForm.valid){
      const control = this.restaurantService.createRestaurant(this.restaurant);
      
      if (control){
        console.log("Restaurante creado")
      } else {
        console.log("Error al crear restaurante")
      }
    }
  }
}
