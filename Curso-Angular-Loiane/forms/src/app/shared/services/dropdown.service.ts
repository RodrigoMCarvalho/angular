import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Estado } from '../models/estado.model';
import { Cidade } from '../models/cidade.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  constructor(private http: HttpClient) { }

  getEstados() {
    return this.http.get<Estado[]>('assets/dados/estados.json');
  }

  getCidades(idEstado) {
    return this.http.get<Cidade[]>('assets/dados/cidades.json')
    .pipe(
      map((cidades: Cidade[]) => cidades.filter(c => c.estado == idEstado))
    )
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
