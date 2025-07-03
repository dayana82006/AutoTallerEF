import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './modules/landing/pages/landing/landing.component';
import { LoginComponent } from './modules/auth/pages/login/login.component';
import { OrderSearch } from './modules/landing/pages/order-search/order-search';
import {authGuard } from '../app/guards/auth-guard';

export const routes: Routes = [

  { path: '', component: LandingComponent },
  { path: 'consultas', component: OrderSearch },
  { path: 'auth/login', component: LoginComponent },

  {
  path: 'admin',
  canActivate: [authGuard],
  data: { roles: ['Administrador'] },
  loadChildren: () => import('./modules/admin/admin-module').then(m => m.AdminModule)
},
  {
    path: 'mecanico',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./modules/mecanico/mecanico-module').then(m => m.MecanicoModule)
  },
  {
    path: 'recepcionista',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./modules/recepcionista/recepcionista-module').then(m => m.RecepcionistaModule)
  },

  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
