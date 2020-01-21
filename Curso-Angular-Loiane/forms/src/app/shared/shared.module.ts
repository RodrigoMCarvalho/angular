import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormDebugComponent } from './form-debug/form-debug.component';
import { CampoControlErrorComponent } from './campo-control-error/campo-control-error.component';
import { ConsultaCepService } from '../data-form/services/consulta-cep.service';



@NgModule({
  declarations: [
    FormDebugComponent,
    CampoControlErrorComponent
  ],
  exports: [
    FormDebugComponent,
    CampoControlErrorComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [ConsultaCepService],
})
export class SharedModule { }
