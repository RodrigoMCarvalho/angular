import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { NotificationService } from '../notification.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/timer';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'mt-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.css'],
  animations: [
    trigger('snack-visibility', [
      state('hidden', style({
        opacity: 0,
        bottom: '0px'
      })),
      state('visible', style({
        opacity: 1,
        bottom: '30px'
      })),
      transition('hidden => visible', animate('500ms 0s ease-in')),
      transition('visible => hidden', animate('500ms 0s ease-out'))
    ])
  ]
})
export class SnackbarComponent implements OnInit {

  message: string;

  snackVisibility: string = 'hidden';

  constructor(private notificationService: NotificationService) { }

  /*EventEmitter é utilizado de um Child par aum Parent.
   *Para fazer comunicações de serviços para o componente é necessário utilizar o Subject.
  */
  ngOnInit() {
    this.notificationService.notifier$
        .subscribe(message => {
          this.message = message;
          this.snackVisibility ='visible';
        setTimeout(() => {
          this.snackVisibility = 'hidden';
        }, 1500);
    });

  /*
  toggleSnack() {
    this.snackVisibility = this.snackVisibility === 'hidden' ? 'visible' : 'hidden';
  }*/
  }
}
