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
import { SparesCrudComponent } from './spares/spares-crud.component/spares-crud.component';
import { ServiceTypesCrudComponent } from './servicesTaller/services-type-crud.component/services-type-crud.component';
import { ServiceOrderFormComponent } from './servicesTaller/services-order-crud.component/services-order-form/services-order-form';
import { ServiceOrderListComponent } from './servicesTaller/services-order-crud.component/services-order-list/services-order-list';

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
    VehicleAnormalityCrudComponent,
    SparesCrudComponent,
    ServiceTypesCrudComponent,
    ServiceOrderFormComponent,
    ServiceOrderListComponent
    
  ]
})
export class AdminModule { }
