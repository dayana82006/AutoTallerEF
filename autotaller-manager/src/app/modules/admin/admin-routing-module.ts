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
      { path: 'usuarios/especialidades', loadComponent: () => import('./pages/specialty-crud/specialty-crud.component').then(m => m.SpecialtyCrudComponent) },

      // ✅ Lista de clientes
      { path: 'clientes', loadComponent: () => import('./client/pages/client-list/client-list.component').then(m => m.ClientListComponent) },
      // ✅ Formulario de clientes (edición o creación)
      { path: 'clientes/edit/:id', loadComponent: () => import('./client/pages/client-form/client-form.component').then(m => m.ClientFormComponent) },
      { path: 'clientes/new', loadComponent: () => import('./client/pages/client-form/client-form.component').then(m => m.ClientFormComponent) },

      { path: '', redirectTo: 'usuarios', pathMatch: 'full' }
    ]
  }
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
