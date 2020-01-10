import { Restaurant } from './restaurant.model';
import { Http } from '@angular/http';
import { MEAT_API } from 'app/app.api';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Injectable } from '@angular/core';
import { ErrorHandler } from 'app/app.error-handler';
import { MenuItem } from 'app/restaurant-detail/menu-item/menu-item.model';

@Injectable()
export class RestaurantsService {

  constructor(private http: Http) { }

  // Método que retorna uma lista de restaurantes
  restaurants(search?: string): Observable<Restaurant[]> {
    return this.http.get(`${MEAT_API}/restaurants`, {params: { q: search }}) // q = busca genérica em todos os atributos
          .map(response => response.json())                                  // não somente no nome
          .catch(ErrorHandler.handleError);
  }

  // Método que recebe um id por parâmetro e retorna um restaurante
  restaurantById(id: string): Observable<Restaurant> {
    return this.http.get(`${MEAT_API}/restaurants/${id}`)
          .map(response => response.json())
          .catch(ErrorHandler.handleError);
  }

  // Método que recebe o id do restaurante por parâmetro e retorna o reviews associado
  reviewsOfRestaurants(id: string): Observable<any> {
    return this.http.get(`${MEAT_API}/restaurants/${id}/reviews`)
          .map(response => response.json())
          .catch(ErrorHandler.handleError);
  }

  menuOfRestaurants(id: string): Observable<MenuItem> {
    return this.http.get(`${MEAT_API}/restaurants/${id}/menu`)
          .map(response => response.json())
          .catch(ErrorHandler.handleError);
  }
}
