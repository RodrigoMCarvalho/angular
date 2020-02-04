import { Component, OnInit } from '@angular/core';
import { tap, take } from 'rxjs/operators';
import { EnviarValorService } from 'src/app/service/enviar-valor.service';

@Component({
  selector: 'app-poc-take',
  template: `
    <app-poc-base [nome]="nome"
      [valor]="valor" estilo="bg-info">
    </app-poc-base>
  `
})
export class PocTakeComponent implements OnInit {

  nome = 'Componente com take';
  valor: string;

  constructor(private service: EnviarValorService) {}

  ngOnInit() {
    this.service.getValor()
      .pipe(
        tap(v => console.log(this.nome, v)),
        take(1)
      )
      .subscribe(novoValor => (this.valor = novoValor));
  }
  ngOnDestroy() {
    console.log(`${this.nome} foi destruido`);
  }
}
