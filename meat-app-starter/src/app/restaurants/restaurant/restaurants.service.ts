import { Restaurant } from './restaurant.model';
import { Http } from '@angular/http';
import { MEAT_API } from 'app/app.api';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Injectable } from '@angular/core';
import { ErrorHandler } from 'app/app.error-handler';

@Injectable()
export class RestaurantsService {

  constructor(private http: Http) { }

  // Método que retorna uma lista de restaurantes
  restaurants(): Observable<Restaurant[]> {
    return this.http.get(`${MEAT_API}/restaurants`)
          .map(response => response.json())
          .catch(ErrorHandler.handleError);
  }

  // Método que recebe um id por parâmetro e retorna um restaurante
  restaurantById(id: string): Observable<Restaurant> {
    return this.http.get(`${MEAT_API}/restaurants/${id}`)
          .map(response => response.json())
          .catch(ErrorHandler.handleError);
  }

  reviewsOfRestaurants(id: string): Observable<any> {
    return this.http.get(`${MEAT_API}/restaurants/${id}/reviews`)
          .map(response => response.json())
          .catch(ErrorHandler.handleError);
  }
}
