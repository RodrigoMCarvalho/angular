import { Component, OnInit } from '@angular/core';
import { RadioOption } from 'app/shared/radio/radio-option.model';

@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {

  paymentOptions: RadioOption[] = [
    {label: 'Dinheiro', value: 'DIN'},
    {label: 'Cartão Refeição', value: 'REF'},
    {label: 'Cartão de débito', value: 'DEB'}
  ]

  constructor() { }

  ngOnInit() {
  }

}
