import { Component, OnInit } from '@angular/core';
import { EnviarValorService } from 'src/app/service/enviar-valor.service';

@Component({
  selector: 'app-unsubscribe-poc',
  templateUrl: './unsubscribe-poc.component.html',
  styleUrls: ['./unsubscribe-poc.component.scss']
})
export class UnsubscribePocComponent implements OnInit {


  mostrarComponentes = true;

  constructor(private enviarValorService: EnviarValorService) { }

  ngOnInit() {
  }

  emitirValor(valor: string) {

  }

  destruirComponentes() {
    this.mostrarComponentes = !this.mostrarComponentes;
  }

}

