import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar';

const routes: Routes = [
  { path: '', component: NavbarComponent } // al ir a /admin
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MecanicoRoutingModule {}
