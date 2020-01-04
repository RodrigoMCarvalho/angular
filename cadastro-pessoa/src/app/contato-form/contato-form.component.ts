import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Contato } from '../models/contato.model';
import { ContatoService } from '../services/contato.service';

@Component({
  selector: 'app-contato-form',
  templateUrl: './contato-form.component.html'
})
export class ContatoFormComponent implements OnInit {

  contato: Contato;
  contatos: Contato[];

  constructor(private contatoService: ContatoService) { }

  ngOnInit() {
    this.contato = new Contato();
  }

  onSubmit(form: NgForm) {
    this.contato = form.value;
    this.contato.id = new Date().getTime().toString();
    this.contatoService.save(this.contato);
  }

}
