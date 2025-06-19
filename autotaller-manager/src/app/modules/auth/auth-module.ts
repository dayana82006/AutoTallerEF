import { NgModule } from '@angular/core'; // ✅ Removido la 'e' extra
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AuthRoutingModule } from './auth-routing-module';
import { LoginComponent } from './pages/login/login.component';
// import { SignupComponent } from './pages/signup/signup.component';

@NgModule({
  declarations: [
    // ✅ Movemos LoginComponent a imports ya que Angular lo detecta como standalone
    // SignupComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    AuthRoutingModule,
    LoginComponent // ✅ Aquí va el componente standalone
  ]
})
export class AuthModule {}