import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Injectable, Injector } from '@angular/core';
import { LoginService } from './login/login.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private injector: Injector) {}

  intercept(resquest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const loginService = this.injector.get(LoginService);
    if (loginService.isLoggedIn()) {
      const authRequest = resquest.clone(  // é chamado o método clone pois é um objeto imutável
        { setHeaders: { 'Authorization': `Bearer ${loginService.user.accessToken}`}})
      return next.handle(authRequest);
    } else {
      return next.handle(resquest);
    }
  }
}
