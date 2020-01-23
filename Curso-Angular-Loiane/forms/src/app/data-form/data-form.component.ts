import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConsultaCepService } from '../shared/services/consulta-cep.service';
import { DropdownService } from '../shared/services/dropdown.service';
import { Estados } from '../shared/models/estados.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent implements OnInit {

  formulario: FormGroup;
  // estados: Estados[];
  estados: Observable<Estados[]>; //Para utilização do pipe async
  cargos: any[];
  tecnologias: any[];
  newsletter: any[];

  constructor(
    private fb: FormBuilder,
    private cepService: ConsultaCepService,
    private dropdownService: DropdownService) { }

  ngOnInit() {
    this.formulario = this.fb.group({
      nome:   [null, [Validators.required, Validators.minLength(3)]],
      email:  [null, [Validators.required, Validators.email]],

      endereco : this.fb.group({
        rua:         [null, Validators.required],
        cep:         [null, Validators.required],
        numero:      [null, Validators.required],
        complemento: [null],
        bairro:      [null, Validators.required],
        cidade:      [null, Validators.required],
        estado:      [null, Validators.required]
      }),
        cargo:       [null],
        tecnologias: [null],
        newsletter:  ['s']
    });
    /*this.dropdownService.getEstados().subscribe(dados => {
      this.estados = dados; console.log(dados);
    });*/
    this.estados = this.dropdownService.getEstados();
    this.cargos = this.dropdownService.getCargos();
    this.tecnologias = this.dropdownService.getTecnologias();
    this.newsletter = this.dropdownService.getNewsletter();
  }
  reset() {
    this.formulario.reset();
  }

  verificaValidTouched(campo: string) {
    return !this.formulario.get(campo).valid && this.formulario.get(campo).touched;
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

  consultaCep() {
    const cep = this.formulario.get('endereco.cep').value;

    if (cep != null && cep !== '') {
      this.cepService.consultaCep(cep).subscribe(dados => this.populaDadosForm(dados));
    }
  }

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


}
