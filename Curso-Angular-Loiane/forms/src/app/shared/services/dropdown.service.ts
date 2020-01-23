import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Estados } from '../models/estados.model';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  constructor(private http: HttpClient) { }

  getEstados() {
    return this.http.get<Estados[]>('assets/dados/estados.json');
  }

  getCargos() {
    return [
      {nome: 'Dev', nivel: 'Junior', desc: 'Dev Jr'},
      {nome: 'Dev', nivel: 'Pleno', desc: 'Dev Pl'},
      {nome: 'Dev', nivel: 'Senior', desc: 'Dev Sr'}
    ]
  }

  getTecnologias() {
    return [
      { nome: 'java', desc: 'Java'},
      { nome: 'javascript', desc: 'Javascript'},
      { nome: 'angular', desc: 'Angular'},
      { nome: 'php', desc: 'PHP'},
    ]
  }

  getNewsletter() {
    return [
      { valor: 's', desc: 'Sim'},
      { valor: 'n', desc: 'Não'}
    ]
  }
}
