import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MecanicoRoutingModule } from './mecanico-routing-module';
import { MecanicoNavbarComponent } from './components/navbar/navbar';
import { MecanicoDashboardComponent } from './mecanico-dashboard/mecanico-dashboard.component/mecanico-dashboard.component';
import { MecanicoLayoutComponent } from './mecanico-layout/mecanico-layout.component';


@NgModule({
  declarations: [
  
  
  ],
  imports: [
    MecanicoNavbarComponent,
    CommonModule,
    MecanicoRoutingModule,
    MecanicoDashboardComponent,
    MecanicoLayoutComponent
  ]
})
export class MecanicoModule { }
