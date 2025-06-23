import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecepcionistaLayout } from './layouts/recepcionista-layout/recepcionista-layout';

const routes: Routes = [
  { 
    path: '', 
    component: RecepcionistaLayout ,
    children: [
      { path: 'clientes', loadComponent: () => import('../admin/client/client-list/client-list.component').then(m => m.ClientListComponent) },
      { path: 'clientes/edit/:id', loadComponent: () => import('../admin/client/client-form/client-form.component').then(m => m.ClientFormComponent) },
      { path: 'clientes/new', loadComponent: () => import('../admin/client/client-form/client-form.component').then(m => m.ClientFormComponent) },
      { path: 'vehiculos', loadComponent: () => import('../admin/vehicles/vehicle-list/vehicle-list.component').then(m => m.VehicleListComponent) },
      { path: 'vehiculos/new', loadComponent: () => import('../admin/vehicles/vehicle-form/vehicle-form.component').then(m => m.VehicleFormComponent) },
      { path: 'vehiculos/edit/:id', loadComponent: () => import('../admin/vehicles/vehicle-form/vehicle-form.component').then(m => m.VehicleFormComponent) },      
      {path: 'ordenes', loadComponent: () => import ('../admin/servicesTaller/services-order-crud.component/services-order-list/services-order-list').then(m=>m.ServiceOrderListComponent)},

      { path: '', redirectTo: 'usuarios', pathMatch: 'full' }
    ]
  } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecepcionistaRoutingModule {}
