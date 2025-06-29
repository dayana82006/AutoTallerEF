import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MecanicoNavbarComponent } from '../components/navbar/navbar';  

@Component({
  selector: 'app-mecanico-layout',
  standalone: true,
  imports: [RouterModule, MecanicoNavbarComponent],
  templateUrl: './mecanico-layout.component.html'
})
export class MecanicoLayoutComponent {}
