import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './modules/landing/pages/landing/landing.component';
import { LoginComponent } from './modules/auth/pages/login/login.component';
import { OrderSearch } from './modules/landing/pages/order-search/order-search';
import { HttpClientModule } from '@angular/common/http';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'consultas', component: OrderSearch},
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


  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), HttpClientModule],
  exports: [RouterModule]
})
export class AppRoutingModule {}
