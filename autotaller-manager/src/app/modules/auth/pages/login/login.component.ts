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

  constructor(private authService: AuthService, private router: Router, private swalService: SwalService) {}

  onSubmit(): void {
    const credentials: AuthRequest = {
      email: this.email,
      password: this.password
    };

    this.authService.login(credentials).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('userName', res.userName);
        localStorage.setItem('role', res.role);

        this.authService.currentUser = res;

        if (res.role === 'Admin') {
          this.router.navigate(['/admin']);
        } else if (res.role === 'Mecánico') {
          this.router.navigate(['/mecanico']);
        } else if (res.role === 'Recepcionista') {
          this.router.navigate(['/recepcionista']);
        }
      },
      error: () => {
        this.swalService.error('Error', 'Credenciales inválidas');
      }
    });
  }
}