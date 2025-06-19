import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthRoutingModule } from './auth-routing-module';
import { LoginComponent } from './pages/login/login.component';
//import { SignupComponent } from './pages/signup/signup.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    AuthRoutingModule,
    LoginComponent 
    //SignupComponent 
  ]
})
export class AuthModule {}
