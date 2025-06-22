import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing-module';
import { AdminNavbarComponent } from '../admin/components/navbar/navbar';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout';
import { UserListComponent } from './user/user-list/user-list';
import { VehicleListComponent } from './vehicles/vehicle-list/vehicle-list.component';
import { VehicleFormComponent } from './vehicles/vehicle-form/vehicle-form.component';
import { VehicleAnormalityCrudComponent } from './abnormalities/abnormalities-crud.component/abnormalities-crud.component';

@NgModule({
  declarations: [
  
  ],
  imports: [
    AdminLayoutComponent,
    AdminNavbarComponent,
    CommonModule,
    AdminRoutingModule,
    UserListComponent,
    FormsModule,
    VehicleListComponent,
    VehicleFormComponent,
    VehicleAnormalityCrudComponent
  ]
})
export class AdminModule { }
