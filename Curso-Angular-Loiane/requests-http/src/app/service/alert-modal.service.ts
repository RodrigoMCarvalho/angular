import { Injectable } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AlertModalComponent } from '../shared/alert-modal/alert-modal.component';
import { ConfirmModalComponent } from '../shared/confirm-modal/confirm-modal.component';

export enum AlertTypes {
  DANGER = 'danger',
  SUCESS = 'success'
}

@Injectable({
  providedIn: 'root'
})
export class AlertModalService {

  constructor(private modalService: BsModalService) { }

  private showAlert(message: string, type: AlertTypes, dismissTimeout?: number) {
    const bsModalRef: BsModalRef = this.modalService.show(AlertModalComponent);
    bsModalRef.content.type = type;
    bsModalRef.content.message = message;
    if (dismissTimeout) {
      setTimeout (() => bsModalRef.hide(), dismissTimeout)
    }
  }

  showAlertDanger(message: string) {
    this.showAlert(message, AlertTypes.DANGER);
  }

  showAlertSucess(message: string) {
    this.showAlert(message, AlertTypes.SUCESS, 2000);
  }

  showConfirm(title: string, msg: string, okTxt?: string, cancelTxt?: string) {
    const bsModalRef: BsModalRef = this.modalService.show(ConfirmModalComponent);
    bsModalRef.content.type = title;
    bsModalRef.content.message = msg;

    if (okTxt) {
      bsModalRef.content.type = okTxt;
    }
    if (cancelTxt) {
      bsModalRef.content.type = cancelTxt;
    }
  }
}
