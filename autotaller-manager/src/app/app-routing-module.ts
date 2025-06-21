import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './modules/landing/pages/landing/landing.component';
import { LoginComponent } from './modules/auth/pages/login/login.component';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'auth/login', component: LoginComponent },

  {
    path: 'admin',
    loadChildren: () =>
      import('./modules/admin/admin-module').then(m => m.AdminModule)
  },

  {
    path: 'mecanico',
    loadChildren: () =>
      import('./modules/mecanico/mecanico-module').then(m => m.MecanicoModule)
  },

  {
    path: 'recepcionista',
    loadChildren: () =>
      import('./modules/recepcionista/recepcionista-module').then(m => m.RecepcionistaModule)
  },
  {
    path: 'clientes',
    loadComponent: () =>
      import('../app/modules/admin/client/pages/client-list/client-list.component').then(m => m.ClientListComponent)
  },

  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}