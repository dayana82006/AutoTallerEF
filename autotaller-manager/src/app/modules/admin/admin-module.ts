import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing-module';
import { AdminNavbarComponent } from '../admin/components/navbar/navbar';
import { UserListComponent } from './pages/user-list/user-list';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout';

@NgModule({
  declarations: [
    
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
