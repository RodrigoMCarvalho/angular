import { Component, OnInit } from '@angular/core';
import { Restaurant } from './restaurant/restaurant.model';
import { RestaurantsService } from './restaurant/restaurants.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/from';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'mt-restaurants',
  templateUrl: './restaurants.component.html',
  animations: [
    trigger('toggleSearch', [
      state('hidden', style({
        opacity: 0,
        "max-height": "0px"
      })),
      state('visible', style({
        opacity: 1,
        "max-height": "70px",
        "margin-top": "10PX"
      })),
      transition('* => *', animate('250ms 0s ease-in-out'))
    ])
  ]
})
export class RestaurantsComponent implements OnInit {

  searchBarState = 'hidden';

  restaurants: Restaurant[];

  searchForm: FormGroup;
  searchControl: FormControl;

  constructor(private restaurantService: RestaurantsService,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.searchControl = this.fb.control('');
    this.searchForm = this.fb.group({
      searchControl: this.searchControl
    });

    // Usando reactive forms "searchControl" é capturado o que é digitado e chamado o métudo de busca de restaurando
    // passando por parâmetro o termo de busca "searchTerm"
    this.searchControl.valueChanges
      .debounceTime(500)  //tempo entre uma busca e outra
      .distinctUntilChanged()   //que sejam diferentes um dos outros
      .do(searchTerm => console.log(`q: ${searchTerm}`))
      .switchMap(searchTerm =>
          this.restaurantService.restaurants(searchTerm)
          .catch(error => Observable.from([])))   // Se ocorrer error retorna um array vazio para o subscribe
      .subscribe(res => this.restaurants = res);

    this.restaurantService.restaurants()
        .subscribe(restaurants => this.restaurants = restaurants);
  }

  // mostra ou esconde a barra de busca
  toggleSearchBar() {
    this.searchBarState = this.searchBarState === 'hidden' ? 'visible' : 'hidden';
  }

}
