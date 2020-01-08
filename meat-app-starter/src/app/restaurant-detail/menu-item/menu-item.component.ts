import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MenuItem } from './menu-item.model';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'mt-menu-item',
  templateUrl: './menu-item.component.html',
  animations: [
    trigger('menuAppeared', [
      state('ready', style({ opacity: 1 })),
      transition('void => ready', [
        style({ opacity: 0, transform: 'translateY(-20px)'}),
        animate('300ms ease-in')
      ])
    ])
  ]
})
export class MenuItemComponent implements OnInit {

  // Sempre que tiver uma proprietade que o elemento parent for informar, deverá anotar com @Input()
  @Input() menuItem: MenuItem;
  @Output() add = new EventEmitter;

  menuState = 'ready';

  constructor() { }

  ngOnInit() {
  }

  // informa o menu-item que foi clicado
  emitAddEvent() {
    this.add.emit(this.menuItem);
  }

}
