import { Component, OnInit } from '@angular/core';
import { CursosService } from 'src/app/service/cursos.service';
import { Curso } from 'src/app/model/curso.model';
import { Observable, empty, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertModalService } from 'src/app/service/alert-modal.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss'],
  preserveWhitespaces: true
})
export class CursosListaComponent implements OnInit {

  //cursos: Curso[];
  cursos$: Observable<Curso[]>
  error$ = new Subject<boolean>();
  mensageError: string;
  //bsModalRef: BsModalRef;

  constructor(
      private cursosService: CursosService,
      private alertService: AlertModalService,
      private router: Router,
      private route: ActivatedRoute) { }

  ngOnInit() {
    //this.cursosService.list().subscribe(dados => this.cursos = dados);

  this.onRefresh();
  }

  onRefresh() {
    this.cursos$ = this.cursosService.list()
    .pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        this.mensageError = error.message;
        //this.error$.next(true);
        this.handleError();
        return empty();
      })
    )
  }

  onEdit(id) {
    this.router.navigate(['editar', id], { relativeTo: this.route});
  }

  handleError() {
    /*this.bsModalRef = this.modalService.show(AlertModalComponent);
    this.bsModalRef.content.type = 'danger';
    this.bsModalRef.content.message = 'Erro ao carregar os cursos. Tente novamente mais tarde.';*/
    this.alertService.showAlertDanger('Erro ao carregar os cursos. Tente novamente mais tarde.');
  }

}
