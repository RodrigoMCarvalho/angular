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
}
