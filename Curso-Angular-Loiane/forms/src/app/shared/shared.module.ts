import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormDebugComponent } from './form-debug/form-debug.component';
import { CampoControlErrorComponent } from './campo-control-error/campo-control-error.component';
import { ConsultaCepService } from './services/consulta-cep.service';
import { DropdownService } from './services/dropdown.service';
import { HttpClientModule } from '@angular/common/http';



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
    CommonModule,
    HttpClientModule
  ],
  providers: [ConsultaCepService, DropdownService],
})
export class SharedModule { }
