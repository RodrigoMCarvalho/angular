import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ContatoFormComponent } from './contato-form/contato-form.component';
import { LocalStorageModule } from 'angular-2-local-storage';
import { ContatoListComponent } from './contato-list/contato-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContatoFormComponent,
    ContatoListComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    LocalStorageModule.forRoot({
      storageType: 'localStorage'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
