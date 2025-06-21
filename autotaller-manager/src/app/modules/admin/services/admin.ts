import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor() {}

  getUsers(): Observable<User[]> {
    return of([
      {
        id: 1,
        name: 'Juan',
        email: 'juan@example.com',
        userRoles: [
          { roleId: 1, role: { id: 1, name: 'Admin' } }
        ]
      },
      {
        id: 2,
        name: 'Ana',
        email: 'ana@example.com',
        userRoles: [
          { roleId: 2, role: { id: 2, name: 'Recepcionista' } }
        ]
      },
      {
        id: 3,
        name: 'Pedro',
        email: 'pedro@example.com',
        userRoles: [
          { roleId: 3, role: { id: 3, name: 'Mecánico' } }
        ]
      }
    ]);
  }
}
