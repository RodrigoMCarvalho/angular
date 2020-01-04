import { Component, OnInit } from '@angular/core';
import { ContatoService } from '../services/contato.service';
import { Contato } from '../models/contato.model';

@Component({
  selector: 'app-contato-list',
  templateUrl: './contato-list.component.html'
})
export class ContatoListComponent implements OnInit {

  contatos: Contato[];

  constructor(private contatoService: ContatoService) { }

  ngOnInit() {
    this.contatos = this.contatoService.getContatos();
  }

}
