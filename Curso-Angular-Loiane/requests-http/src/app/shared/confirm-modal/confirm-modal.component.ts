import { Component, OnInit, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {

  @Input() title : string;
  @Input() msg : string;
  @Input() cancelTxt = 'Cancelar';
  @Input() okTxt = 'Sim';

  constructor(private bsModalRf: BsModalRef) { }

  ngOnInit() {
  }

  onclose() {
    this.bsModalRf.hide();
  }

  onConfirm() {

  }

}
