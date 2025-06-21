import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing-module';
import { AdminNavbarComponent } from '../admin/components/navbar/navbar';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout';
import { UserListComponent } from './user/user-list/user-list';
import { VehicleList } from './vehicles/vehicle-list/vehicle-list';
import { VehicleForm } from './vehicles/vehicle-form/vehicle-form';

@NgModule({
  declarations: [
    
  
    VehicleList,
             VehicleForm
  ],
  imports: [
    AdminLayoutComponent,
    AdminNavbarComponent,
    CommonModule,
    AdminRoutingModule,
    UserListComponent,
    FormsModule
  ]
})
export class AdminModule { }
