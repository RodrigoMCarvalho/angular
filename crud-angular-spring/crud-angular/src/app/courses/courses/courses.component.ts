import { Component, OnInit } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { Course } from './../model/course';
import { CoursesService } from './../services/courses.service';
import { ErrorDialogComponent } from './../../shared/components/error-dialog/error-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  courses$: Observable<Course[]>;
  displayedColumns: string[] = ['name', 'category'];

  constructor(
        private courseService: CoursesService,
        private dialog: MatDialog
      ) {
    this.courses$ = this.courseService.list()
    .pipe(
      catchError(error => {
        this.onError("Erro para carregar os cursos. Mensagem: " + error.statusText)
        return of([])
      })
    );
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }

  ngOnInit(): void {

  }

}
