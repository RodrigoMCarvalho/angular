import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConsultaCepService } from './services/consulta-cep.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs/internal/observable/of';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent implements OnInit {

  formulario: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient) { }

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
      })

    });
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
    let cep = this.formulario.get('endereco.cep').value;
    // console.log(cep);

    // Nova variável "cep" somente com dígitos.
    cep = cep.replace(/\D/g, '');

    // Verifica se campo cep possui valor informado.
    if (cep !== '') {
      // Expressão regular para validar o CEP.
      const validacep = /^[0-9]{8}$/;

      // Valida o formato do CEP.
      if (validacep.test(cep)) {
        this.http.get(`//viacep.com.br/ws/${cep}/json`).subscribe(dados => this.populaDadosForm(dados));
      }
    }

    return of({});
  }

}
