import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: 'usuarios', loadComponent: () => import('../../modules/admin/user/user-list/user-list').then(m => m.UserListComponent) },
      { path: 'usuarios/edit/:id', loadComponent: () => import('../../modules/admin/user/user-form/user-form').then(m => m.UserFormComponent) },
      { path: 'usuarios/new', loadComponent: () => import('../../modules/admin/user/user-form/user-form').then(m => m.UserFormComponent) },
      { path: 'usuarios/especialidades', loadComponent: () => import('../../modules/admin/specialties/specialty-crud/specialty-crud.component').then(m => m.SpecialtyCrudComponent) },
      { path: 'clientes', loadComponent: () => import('../admin/client/client-list/client-list.component').then(m => m.ClientListComponent) },
      { path: 'clientes/edit/:id', loadComponent: () => import('../admin/client/client-form/client-form.component').then(m => m.ClientFormComponent) },
      { path: 'clientes/new', loadComponent: () => import('../admin/client/client-form/client-form.component').then(m => m.ClientFormComponent) },
      { path: 'vehiculos', loadComponent: () => import('./vehicles/vehicle-list/vehicle-list.component').then(m => m.VehicleListComponent) },
      { path: 'vehiculos/new', loadComponent: () => import('./vehicles/vehicle-form/vehicle-form.component').then(m => m.VehicleFormComponent) },
      { path: 'vehiculos/edit/:id', loadComponent: () => import('./vehicles/vehicle-form/vehicle-form.component').then(m => m.VehicleFormComponent) },
      { path: 'vehiculos/anormalidades', loadComponent: () => import('../admin/abnormalities/abnormalities-crud.component/abnormalities-crud.component').then(m => m.VehicleAnormalityCrudComponent) },
      { path: 'vehiculos/repuestos', loadComponent: () => import('../admin/spares/spares-crud.component/spares-crud.component').then(m => m.SparesCrudComponent) },

    ]
  }
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
