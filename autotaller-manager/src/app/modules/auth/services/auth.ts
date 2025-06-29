import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, throwError } from 'rxjs';
import { AuthRequest } from '../models/auth-request.model';
import { AuthResponse } from '../models/auth-response.model'; 
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:5005/api/Auth/login';
hasRole: any;

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: AuthRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.apiUrl, credentials).pipe(
      tap(response => {
        if (response.estaAutenticado && response.token) {
          sessionStorage.setItem('token', response.token);
          sessionStorage.setItem('user', JSON.stringify(response));
        }
      })
    );
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return sessionStorage.getItem('token');
  }

  getUser(): AuthResponse | null {
    const user = sessionStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  getRole(): string {
    const user = this.getUser();
    return user?.role?.[0] || ''; 
  }
  
    get currentUser(): AuthResponse | null {
    return this.getUser();
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
