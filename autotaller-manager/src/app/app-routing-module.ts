// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './modules/landing/pages/landing/landing.component';
import { LoginComponent } from './modules/auth/pages/login/login.component';
//import { SignupComponent } from './modules/auth/pages/signup/signup.component';

/*export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'auth/login', component: LoginComponent }
  //{ path: 'auth/register', component: SignupComponent }
];*/
export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'auth/login', component: LoginComponent },

  // Ruta para el panel de administrador
  {
    path: 'admin',
    loadChildren: () =>
      import('./modules/admin/admin-module').then(m => m.AdminModule)
  },

  // Ruta para el panel de mecánico
  {
    path: 'mecanico',
    loadChildren: () =>
      import('./modules/mecanico/mecanico-module').then(m => m.MecanicoModule)
  },

  // Ruta para el panel de recepcionista
  {
    path: 'recepcionista',
    loadChildren: () =>
      import('./modules/recepcionista/recepcionista-module').then(m => m.RecepcionistaModule)
  },

  // Redirección por defecto para rutas inválidas
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}