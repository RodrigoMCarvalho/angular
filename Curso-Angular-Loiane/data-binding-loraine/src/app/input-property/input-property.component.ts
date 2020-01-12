import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-input-property',
  templateUrl: './input-property.component.html'
})
export class InputPropertyComponent implements OnInit {

  @Input('nome') nomeCurso: string = '';

  constructor() { }

  ngOnInit() {
  }

}
