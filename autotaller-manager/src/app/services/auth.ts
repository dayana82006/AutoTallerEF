import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { AuthRequest } from '../models/auth-request.model';
import { AuthResponse } from '../models/auth-response.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() {}

  login(credentials: AuthRequest): Observable<AuthResponse> {
    const usersMock = [
      {
        email: 'admin@mail.com',
        password: '123',
        token: 'mock-admin-token',
        userId: 1,
        userName: 'AdminUser',
        role: 'Admin'
      },
      {
        email: 'mecanico@mail.com',
        password: '123',
        token: 'mock-mechanic-token',
        userId: 2,
        userName: 'MecanicoUser',
        role: 'Mecánico'
      },
      {
        email: 'recepcion@mail.com',
        password: '123',
        token: 'mock-recep-token',
        userId: 3,
        userName: 'RecepUser',
        role: 'Recepcionista'
      }
    ];

    const user = usersMock.find(u => u.email === credentials.email && u.password === credentials.password);

    if (user) {
      const response: AuthResponse = {
        token: user.token,
        userId: user.userId,
        userName: user.userName,
        role: user.role
      };

      return of(response).pipe(delay(1000)); // simula retardo del backend
    } else {
      return throwError(() => new Error('Credenciales inválidas'));
    }
  }
}
