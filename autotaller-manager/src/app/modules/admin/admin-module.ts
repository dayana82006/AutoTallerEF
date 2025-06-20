import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing-module';
import { NavbarComponent } from './components/navbar/navbar';
import { UserListComponent } from './pages/user-list/user-list';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout';


@NgModule({
  declarations: [
    NavbarComponent,
    AdminLayoutComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    UserListComponent
  ]
})
export class AdminModule { }
