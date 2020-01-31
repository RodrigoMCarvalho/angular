import { Component, OnInit } from '@angular/core';
import { CursosService } from 'src/app/service/cursos.service';
import { Curso } from 'src/app/model/curso.model';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss'],
  preserveWhitespaces: true
})
export class CursosListaComponent implements OnInit {

  cursos: Curso[];

  constructor(private cursosService: CursosService) { }

  ngOnInit() {
    this.cursosService.list().subscribe(dados => this.cursos = dados);
  }

}
