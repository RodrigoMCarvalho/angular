import { Component, OnInit } from '@angular/core';
import { Contato } from '../models/contato.model';
import { ContatoService } from '../services/contato.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  contato: Contato;
  contatos: Contato[];

  constructor(private contatoService: ContatoService) { }

  ngOnInit() {
    this.contato = new Contato();
    this.contatos = this.contatoService.getContatos();
  }

  edit(contato: Contato) {
    this.contato = contato;
  }

  delete(contato: Contato) {
    let index = this.contatos.map(item => item.id).indexOf(contato.id);
    this.contatoService.delete(contato);
    this.contatos.slice(index, 1);
    this.contatos = this.contatoService.getContatos();
  }

  saveContato(form: NgForm) {
    this.contato = form.value;
    this.contato.id = (this.contato.id) ? this.contato.id : new Date().getTime().toString();
    this.contatoService.save(this.contato);
    this.contatos = this.contatoService.getContatos();
    form.resetForm();
  }

}
