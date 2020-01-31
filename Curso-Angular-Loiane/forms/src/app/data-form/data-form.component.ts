import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { ConsultaCepService } from '../shared/services/consulta-cep.service';
import { DropdownService } from '../shared/services/dropdown.service';
import { Estado } from '../shared/models/estado.model';
import { Observable, empty } from 'rxjs';
import { FormValidations } from '../shared/form-validations';
import { VerificaEmailService } from '../shared/services/verifica-email.service';
import { map, tap, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Cidade } from '../shared/models/cidade.model';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent implements OnInit {

  formulario: FormGroup;
  estados: Estado[];
  //estados: Observable<Estado[]>; //Para utilização do pipe async
  estados$: Observable<Estado[]>;
  cargos: any[];
  tecnologias: any[];
  newsletter: any[];
  frameworks: string[] = ['Angular', 'React', 'Vue', 'Sencha'];
  cidades: Cidade[];


  constructor(
    private fb: FormBuilder,
    private cepService: ConsultaCepService,
    private dropdownService: DropdownService,
    private verificaEmailService: VerificaEmailService) { }

  ngOnInit() {
    this.formulario = this.fb.group({
      nome:            [null, [Validators.required, Validators.minLength(3)]],
      email:           [null, [Validators.required, Validators.email], [this.validarEmail.bind(this)]],
      confirmarEmail:  [null, [FormValidations.equalsTo('email')]],

      endereco : this.fb.group({
        rua:         [null, Validators.required],
        cep:         [null, [Validators.required, FormValidations.cepValidator]],
        numero:      [null, Validators.required],
        complemento: [null],
        bairro:      [null, Validators.required],
        cidade:      [null, Validators.required],
        estado:      [null, Validators.required]
      }),
        cargo:       [null],
        tecnologias: [null],
        newsletter:  ['s'],
        termos:      [null, Validators.pattern('true')],
        frameworks:  this.buildFrameworks()
    });
    /*this.dropdownService.getEstados().subscribe(dados => {
      this.estados = dados; console.log(dados);
    });*/
    //this.estados = this.dropdownService.getEstados();  com pipe async
    this.dropdownService.getEstados().subscribe(dados => this.estados = dados);
    this.cargos = this.dropdownService.getCargos();
    this.tecnologias = this.dropdownService.getTecnologias();
    this.newsletter = this.dropdownService.getNewsletter();
    //this.verificaEmailService.verificarEmail('email1@email.com').subscribe();
    //this.dropdownService.getCidades(8).subscribe(cidade => console.log(cidade));

    this.formulario.get('endereco.cep').statusChanges
        .pipe(
          distinctUntilChanged(),
          tap(value => console.log('Status CEP: ', value)),
          switchMap(status => status === 'VALID' ?
          this.cepService.consultaCep(this.formulario.get('endereco.cep').value ): empty()
          )
        ).subscribe(dados => dados ? this.populaDadosForm(dados): {});


    this.formulario.get('endereco.estado').valueChanges
        .pipe(
          //tap(estado => console.log('Novo Estado:', estado))
          map(estado => this.estados.filter(e => e.sigla === estado)),
          map(estados => estados && estados.length > 0 ? estados[0].id : empty()),
          switchMap(estadoId => this.dropdownService.getCidades(estadoId)),
          tap(console.log)
        ).subscribe(cidades => this.cidades = cidades);

     /* this.formulario.get('endereco.estado').valueChanges
      .pipe(
        switchMap(sigla => this.estados$.pipe(
          map(estados => estados.filter(estado => estado.sigla === sigla)),
          map(estados => estados[0].id),
          switchMap(id => this.dropdownService.getCidades(id).pipe(
            map((cidades: Cidade[]) => this.cidades = cidades)
          ))
        )),
      ).subscribe();*/
  }
  reset() {
    this.formulario.reset();
  }

  verificaValidTouched(campo: string) {
    return !this.formulario.get(campo).valid &&
            (this.formulario.get(campo).touched || this.formulario.get(campo).dirty);
  }

  verificaRequired(campo: string) {
    return this.formulario.get(campo).hasError('required') &&
            (this.formulario.get(campo).touched || this.formulario.get(campo).dirty);
  }

  verificaEmailInvalido() {
    const campoEmail = this.formulario.get('email');
    if (campoEmail.errors) {
      return campoEmail.errors['email'] && campoEmail.touched;
    }
  }

  aplicaCssErro(campo: string) {
    return {
      'has-error': this.verificaValidTouched(campo),
      'has-feedback': this.verificaValidTouched(campo)
    }
  }

   // Popula o formulário com os dados retornados do ViaCep
  populaDadosForm(dados) {
    this.formulario.patchValue({
      endereco: {
        rua: dados.logradouro,
        complemento: dados.complemento,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf
      }
    })
  }

  /*consultaCep() {
    const cep = this.formulario.get('endereco.cep').value;

    if (cep != null && cep !== '') {
      this.cepService.consultaCep(cep).subscribe(dados => this.populaDadosForm(dados));
    }
  }*/

  setarTecnologias() {
    this.formulario.get('tecnologias').setValue(['java', 'javascritp', 'php'])
  }

  setarCargo() {
    let cargo = {nome: 'Dev', nivel: 'Junior', desc: 'Dev Jr'};
    this.formulario.get('cargo').setValue(cargo);
  }

  compararCargos(ob1, ob2) {
    return ob1 && ob2 ? (ob1.nome === ob2.nome && ob1.nivel === ob2.nivel) : ob1 === ob2;
  }

  buildFrameworks() {
    const values = this.frameworks.map(v => new FormControl(false));
    return this.fb.array(values, FormValidations.requiredMinCheckbox(1));
    /*return [
      new FormControl(false),
      new FormControl(false),
      new FormControl(false),
      new FormControl(false)
    ]*/
    }

    validarEmail(formControl: FormControl) {
      return this.verificaEmailService.verificarEmail(formControl.value)
          .pipe(map(emailExiste => emailExiste ? {emailInvalido: true}: null ));
    }


  }













