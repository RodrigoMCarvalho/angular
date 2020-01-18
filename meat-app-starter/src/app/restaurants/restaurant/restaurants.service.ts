import { Restaurant } from './restaurant.model';

import { MEAT_API } from 'app/app.api';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { MenuItem } from 'app/restaurant-detail/menu-item/menu-item.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RestaurantsService {

  constructor(private http: HttpClient) { }

  // Método que retorna uma lista de restaurantes
  restaurants(search?: string): Observable<Restaurant[]> {
    let params: HttpParams = undefined;
    if (params) {
      params = new HttpParams().set('q', search);   // q = busca genérica em todos os atributos
    }
    return this.http.get<Restaurant[]>(`${MEAT_API}/restaurants`, {params:  params })

  }

  // Método que recebe um id por parâmetro e retorna um restaurante
  restaurantById(id: string): Observable<Restaurant> {
    return this.http.get<Restaurant>(`${MEAT_API}/restaurants/${id}`)

  }

  // Método que recebe o id do restaurante por parâmetro e retorna o reviews associado
  reviewsOfRestaurants(id: string): Observable<any> {
    return this.http.get<Restaurant>(`${MEAT_API}/restaurants/${id}/reviews`)

  }

  menuOfRestaurants(id: string): Observable<MenuItem> {
    return this.http.get<MenuItem>(`${MEAT_API}/restaurants/${id}/menu`)

  }
}
