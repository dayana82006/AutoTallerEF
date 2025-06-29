import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RecepcionistaNavbarComponent } from '../../components/navbar/navbar';

@Component({
  selector: 'app-recepcionista-layout',
  standalone: true,
  imports: [RouterModule, RecepcionistaNavbarComponent],
  templateUrl: './recepcionista-layout.html'
})
export class RecepcionistaLayout {

}
