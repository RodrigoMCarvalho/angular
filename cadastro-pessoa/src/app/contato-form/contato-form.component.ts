import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Contato } from './contato.model';

@Component({
  selector: 'app-contato-form',
  templateUrl: './contato-form.component.html'
})
export class ContatoFormComponent implements OnInit {

  contato: Contato;

  constructor() { }

  ngOnInit() {
    this.contato = new Contato();
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
  }

}
