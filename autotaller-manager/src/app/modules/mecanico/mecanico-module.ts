import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MecanicoRoutingModule } from './mecanico-routing-module';
import { MecanicoNavbarComponent } from './components/navbar/navbar';


@NgModule({
  declarations: [
  ],
  imports: [
    MecanicoNavbarComponent,
    CommonModule,
    MecanicoRoutingModule
  ]
})
export class MecanicoModule { }
