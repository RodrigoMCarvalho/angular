import { Component, OnInit, OnDestroy } from '@angular/core';
import { tap, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { EnviarValorService } from 'src/app/service/enviar-valor.service';

@Component({
  selector: 'app-poc-take-until',
  template: `
    <app-poc-base [nome]="nome"
      [valor]="valor" estilo="bg-primary">
    </app-poc-base>
  `
})
export class PocTakeUntilComponent implements OnInit {

  nome = 'Componente com takeUntil';
  valor: string;

  constructor(private service: EnviarValorService) {}

  ngOnInit() {

  }
}
