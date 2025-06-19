// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './modules/landing/pages/landing/landing.component';
import { LoginComponent } from './modules/auth/pages/login/login.component';
//import { SignupComponent } from './modules/auth/pages/signup/signup.component';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'auth/login', component: LoginComponent }
  //{ path: 'auth/register', component: SignupComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}