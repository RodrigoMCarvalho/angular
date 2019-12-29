import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MenuItem } from './menu-item.model';

@Component({
  selector: 'mt-menu-item',
  templateUrl: './menu-item.component.html'
})
export class MenuItemComponent implements OnInit {

  // Sempre que tiver uma proprietade que o elemento parent for informar, deverá anotar com @Input()
  @Input() menuItem: MenuItem;
  @Output() add = new EventEmitter;

  constructor() { }

  ngOnInit() {
  }

  // informa o menu-item que foi clicado
  emitAddEvent() {
    this.add.emit(this.menuItem);
  }

}
