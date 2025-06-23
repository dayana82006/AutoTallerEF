import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth';
import { AuthRequest } from '../../models/auth-request.model';
import { SwalService } from '../../../../shared/swal.service';

@Component({
  selector: 'app-login',
  standalone: true, 
  imports: [CommonModule, FormsModule], 
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private swalService: SwalService
  ) {}

  onSubmit(): void {
    const credentials: AuthRequest = {
      email: this.email,
      password: this.password
    };

    this.authService.login(credentials).subscribe({
      next: (res) => {
        sessionStorage.setItem('currentUser', JSON.stringify(res));
        
        this.authService.currentUser = res;

        switch (res.role) {
          case 'Admin':
            this.router.navigate(['/admin']);
            break;
          case 'Mecánico':
            this.router.navigate(['/mecanico']);
            break;
          case 'Recepcionista':
            this.router.navigate(['/recepcionista']);
            break;
          default:
            this.swalService.error('Error', 'Rol no reconocido');
        }
      },
      error: () => {
        this.swalService.error('Error', 'Credenciales inválidas');
      }
    });
  }
}
