import { Injectable } from '@angular/core';
import { Course } from './../model/course';
import { HttpClient } from '@angular/common/http';
import { delay, first, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private readonly API = '/assets/courses.json';

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<Course[]>(this.API)
              .pipe(
                first(),
                delay(5000),  //testar o loading
                tap(courses => console.log(courses))
              );
  }
}
