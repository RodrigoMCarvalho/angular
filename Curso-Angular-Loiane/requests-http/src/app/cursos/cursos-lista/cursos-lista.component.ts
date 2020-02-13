import { Component, OnInit, ViewChild } from '@angular/core';
import { CursosService } from 'src/app/service/cursos.service';
import { Curso } from 'src/app/model/curso.model';
import { Observable, empty, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertModalService } from 'src/app/service/alert-modal.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Curso2Service } from 'src/app/service/curso-2.service';

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
  deleteModalRef: BsModalRef;
  cursoSelecionado: Curso;

  @ViewChild('deleteModal', {static: true }) deleteModal;

  constructor(
      private cursosService: Curso2Service,
      private modalService: BsModalService,
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

  onDelete(curso) {
    this.cursoSelecionado = curso;
    //this.deleteModalRef = this.modalService.show(this.deleteModal, { class: 'modal-sm'});
    this.alertService.showConfirm('Confirmação', 'Tem certeza que deseja excluir este curso?' );
  }

  onConfirmDelete() {
    this.cursosService.remove(this.cursoSelecionado.id)
    .subscribe(
      sucess => {
        this.alertService.showAlertSucess('Curso excluído com sucesso'),
        this.deleteModalRef.hide();
        this.onRefresh()
        },
      error => {
        this.deleteModalRef.hide();
        this.alertService.showAlertDanger('Erro ao excluir o curso. Tente novamente mais tarde.')
      }
    );
  }

  onDeclineDelete() {
    this.deleteModalRef.hide();
  }

  handleError() {
    /*this.bsModalRef = this.modalService.show(AlertModalComponent);
    this.bsModalRef.content.type = 'danger';
    this.bsModalRef.content.message = 'Erro ao carregar os cursos. Tente novamente mais tarde.';*/
    this.alertService.showAlertDanger('Erro ao carregar os cursos. Tente novamente mais tarde.');
  }

}
