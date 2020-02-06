import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Curso } from '../model/curso.model';
import { environment } from 'src/environments/environment';
import { tap, delay, take } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  private readonly API = environment.API;

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<Curso[]>(`${this.API}/cursos`)
      .pipe(
        delay(1500),
        tap(console.log)
      );
  }

  create(curso) {
    return this.http.post(`${this.API}/cursos`, curso)
      .pipe(take(1));
  }


}
