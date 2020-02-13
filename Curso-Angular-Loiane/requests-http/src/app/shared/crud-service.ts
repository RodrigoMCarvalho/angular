import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { take, delay, tap } from 'rxjs/operators';

export class CrudService<T> {

  constructor(protected http: HttpClient, private API_URL) { }

  list() {
    return this.http.get<T[]>(`${this.API_URL}`)
      .pipe(
        delay(1500),
        tap(console.log)
      );
  }

  loadByID(id) {
    return this.http.get<T>(`${this.API_URL}`).pipe(take(1));
  }

  create(record: T) {
      return this.http.post(`${this.API_URL}`, record).pipe(take(1));
  }

  update(record: T) {
    return this.http.put(`${this.API_URL}/${record['id']}`, record).pipe(take(1));
  }

  remove(id) {
    return this.http.delete(`${this.API_URL}/${id}`).pipe(take(1));
  }
}
