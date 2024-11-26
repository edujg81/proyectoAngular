import { Injectable } from '@angular/core';
import { RESTAURANT_LIST } from './mocks';
import { Restaurant } from './models';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RestaurantService {
  sendData: Subject<any> = new Subject<any>();

  url = 'http://107.191.63.129:8000/restaurants/';

  constructor(private http: HttpClient) {}

  getSendDataObservable() {
     return this.sendData.asObservable();
  }

  getRestaurants() {
    return RESTAURANT_LIST;
  }

  getRestaurantById(id: number) {
    return id > 0 && id < 11 ? RESTAURANT_LIST[id - 1] : undefined;
  }

  getRestaurantsHttp(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(
      'http://107.191.63.129:8000/restaurants/'
    );
  }

  getRestaurantByIdHttp(id: number): Observable<Restaurant> {
    let urlId = `${this.url}${id}/`;
    return this.http.get<Restaurant>(urlId);
  }

  createRestaurant(restaurant: Restaurant): Number {
    return RESTAURANT_LIST.push(restaurant);
  }

  
  createRestaurantHttp(data: Restaurant) {
    return this.http.post<Restaurant>(
      'http://107.191.63.129:8000/restaurants/',
      data
    );
  }
  editRestaurant(id: number, data: Restaurant) {
    return this.http.patch<Restaurant>(
      `http://107.191.63.129:8000/restaurants/${id}/`,
      data
    );
  }
  deleteRestaurant(id: number) {
    return this.http.delete<Restaurant>(
      `http://107.191.63.129:8000/restaurants/${id}/`
    );
  }
}
