import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormDebugComponent } from './form-debug/form-debug.component';
import { CampoControlErrorComponent } from './campo-control-error/campo-control-error.component';



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
  ]
})
export class SharedModule { }
