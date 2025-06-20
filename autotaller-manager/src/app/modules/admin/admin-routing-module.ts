import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: 'usuarios', loadComponent: () => import('./pages/user-list/user-list').then(m => m.UserListComponent) },
      { path: 'usuarios/edit/:id', loadComponent: () => import('./pages/user-form/user-form').then(m => m.UserFormComponent) },
      { path: 'usuarios/new', loadComponent: () => import('./pages/user-form/user-form').then(m => m.UserFormComponent) },
      { path: 'usuarios/especialidades', loadComponent: () => import('../admin/pages/specialty-crud/specialty-crud.component').then(m => m.SpecialtyCrudComponent) },
      { path: '', redirectTo: 'usuarios', pathMatch: 'full' }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
