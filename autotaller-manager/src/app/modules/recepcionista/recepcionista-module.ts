import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecepcionistaRoutingModule } from './recepcionista-routing-module';
import { NavbarComponent } from './components/navbar/navbar';


@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    RecepcionistaRoutingModule
  ]
})
export class RecepcionistaModule { }
