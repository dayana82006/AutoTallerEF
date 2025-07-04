import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecepcionistaRoutingModule } from './recepcionista-routing-module';
import { RecepcionistaNavbarComponent } from './components/navbar/navbar';
import { RecepcionistaLayout } from './layouts/recepcionista-layout/recepcionista-layout';
import { ReceptionistDashboardComponent } from './recepcionista-dashboard/recepcionista-dashboard.component/recepcionista-dashboard.component';


@NgModule({
  declarations: [
  
  
  ],
  imports: [
    RecepcionistaLayout,
    RecepcionistaNavbarComponent,
    CommonModule,
    RecepcionistaRoutingModule,
    ReceptionistDashboardComponent
  ]
})
export class RecepcionistaModule { }
