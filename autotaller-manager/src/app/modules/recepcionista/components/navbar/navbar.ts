import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'recepcionista-navbar',
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class RecepcionistaNavbarComponent {
  constructor(private router: Router) {}

logout(event: Event) {
  event.preventDefault(); 

  const confirmLogout = confirm('¿Estás segura(o) de cerrar sesión?');
  if (confirmLogout) {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
}
