import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CursosService } from 'src/app/service/cursos.service';
import { AlertModalService } from 'src/app/service/alert-modal.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-cursos-form',
  templateUrl: './cursos-form.component.html',
  styleUrls: ['./cursos-form.component.scss']
})
export class CursosFormComponent implements OnInit {

  form: FormGroup;
  submitted: boolean = false;

  constructor(
    private fb: FormBuilder,
    private service: CursosService,
    private modal: AlertModalService,
    private location: Location,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.form = this.fb.group({
      id:   [null],
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(40)]]
    })
    this.route.params.pipe(
      map((params: any) => params['id']),
      switchMap(id => this.service.loadByID(id))
    )
      .subscribe(curso => this.updateForm(curso))
    }

  onSubmit() {
    this.submitted = true;
    if (this.form.valid) {
      this.service.create(this.form.value).subscribe(
        success => {
          this.modal.showAlertSucess('Curso criado com sucesso!');
          this.location.back();
        },
        error => this.modal.showAlertDanger('Erro ao criar o curso, tente novamente.')
      );
    }
  }

  onCancel() {
    this.submitted = false;
    this.form.reset();
  }

  updateForm(curso) {
    this.form.patchValue({
      id: curso.id,
      nome: curso.nome
    })
  }

  hasError(field: string) {
    return this.form.get(field).errors;
  }

}
