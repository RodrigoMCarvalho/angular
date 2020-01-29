import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormDebugComponent } from './form-debug/form-debug.component';
import { CampoControlErrorComponent } from './campo-control-error/campo-control-error.component';
import { ConsultaCepService } from './services/consulta-cep.service';
import { DropdownService } from './services/dropdown.service';
import { HttpClientModule } from '@angular/common/http';
import { ErrorMsgComponent } from './error-msg/error-msg.component';
import { InputFieldComponent } from './input-field/input-field.component';



@NgModule({
  declarations: [
    FormDebugComponent,
    CampoControlErrorComponent,
    ErrorMsgComponent,
    InputFieldComponent
  ],
  exports: [
    FormDebugComponent,
    CampoControlErrorComponent,
    ErrorMsgComponent,
    InputFieldComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [ConsultaCepService, DropdownService],
})
export class SharedModule { }
