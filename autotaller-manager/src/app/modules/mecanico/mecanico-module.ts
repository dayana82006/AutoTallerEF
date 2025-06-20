import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MecanicoRoutingModule } from './mecanico-routing-module';
import { NavbarComponent } from './components/navbar/navbar';


@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    MecanicoRoutingModule
  ]
})
export class MecanicoModule { }
