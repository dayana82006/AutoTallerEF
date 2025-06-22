import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MecanicoNavbarComponent } from './components/navbar/navbar';

const routes: Routes = [
  { path: '', 
    component: MecanicoNavbarComponent 
  } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MecanicoRoutingModule {}
