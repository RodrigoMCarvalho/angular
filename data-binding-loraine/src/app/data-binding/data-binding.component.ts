import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-data-binding',
  templateUrl: './data-binding.component.html',
  styleUrls: ['./data-binding.component.css']
})
export class DataBindingComponent implements OnInit {

  url = 'https://odia.ig.com.br/';
  urlImage = 'http://lorempixel.com/400/200/sports/1/';

  constructor() { }

  ngOnInit() {
  }

}
