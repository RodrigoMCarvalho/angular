import { EventEmitter } from '@angular/core';

export class NotificationService {

  notifier = new EventEmitter<string>();
  public notifier$ = this.notifier.asObservable();

  notify(message: string) {
    this.notifier.emit(message);
  }




}
