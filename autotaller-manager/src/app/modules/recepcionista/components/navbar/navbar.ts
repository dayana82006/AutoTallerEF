import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SwalService } from '../../../../shared/swal.service'; 

@Component({
  selector: 'recepcionista-navbar',
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss']
})
export class RecepcionistaNavbarComponent {
  constructor(
    private router: Router,
    private swal: SwalService 
  ) {}

  logout(event: Event) {
    event.preventDefault();

    this.swal.confirm('¿Cerrar sesión?', 'Tu sesión se cerrará y deberás iniciar sesión de nuevo.')
      .then(confirmed => {
        if (confirmed) {
          localStorage.clear();
          this.router.navigate(['/login']);
        }
      });
  }
}
