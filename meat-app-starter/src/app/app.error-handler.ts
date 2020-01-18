import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { NotificationService } from './shared/messages/notification.service';
import { LoginService } from './security/login/login.service';

@Injectable()
export class AppErrorHandler extends ErrorHandler {

  constructor(
    private ns: NotificationService,
    private injector: Injector) {   // evitar o erro cyclic dependency
    super();
  }


  handleError( errorResponse: HttpErrorResponse | any) {
    const message = errorResponse.error.message;
    const loginService = this.injector.get(LoginService);

    if (errorResponse instanceof HttpErrorResponse) {
      switch (errorResponse.status) {
        case 401:
          loginService.handleLogin();
        break;
        case 403:
          this.ns.notify(message || 'Não autorizado.')
        break;
        case 404:
          this.ns.notify(message || 'Não encontrado.')
        break;
      }
    }
    super.handleError(errorResponse);
    }
}
