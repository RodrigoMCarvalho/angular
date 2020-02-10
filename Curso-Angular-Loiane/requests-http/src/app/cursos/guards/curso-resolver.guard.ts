import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Curso } from 'src/app/model/curso.model';
import { CursosService } from 'src/app/service/cursos.service';

@Injectable({
  providedIn: 'root'
})
export class CursoResolverGuard implements Resolve<Curso> {

  constructor(private service: CursosService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Curso> {
     if (route.params && route.params['id']) {
      return this.service.loadByID(route.params['id']);
     }
     return of ({
       id: null,
       nome: null
     });
  }

}
