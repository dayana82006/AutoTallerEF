import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { UserMember } from '../../../models/user-member.model';

@Injectable({
  providedIn: 'root'
})
export class MockUserService {
  private users: UserMember[] = [
    {
      id: 1,
      name: 'Juan',
      lastname: 'Pérez',
      email: 'juan@mail.com',
      role: 'Mecánico',
      specialties: ['Frenos', 'Motor']
    },
    {
      id: 2,
      name: 'Laura',
      lastname: 'Gómez',
      email: 'laura@mail.com',
      role: 'Recepcionista',
      specialties: []
    },
    {
      id: 3,
      name: 'Carlos',
      lastname: 'Ramírez',
      email: 'carlos@mail.com',
      role: 'Admin',
      specialties: []
    }
  ];

  // 🧠 Obtiene el siguiente ID disponible de forma dinámica
  private getNextId(): number {
    return this.users.length ? Math.max(...this.users.map(u => u.id ?? 0)) + 1 : 1;
  }

  // 🔍 Listado con paginación y búsqueda
  getUsers(search: string = '', page: number = 1, pageSize: number = 5): Observable<{ users: UserMember[], total: number }> {
    const filtered = this.users.filter(u =>
      (u.name + ' ' + u.lastname).toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase())
    );
    const start = (page - 1) * pageSize;
    const paginated = filtered.slice(start, start + pageSize);
    return of({ users: paginated, total: filtered.length }).pipe(delay(300));
  }

  // 🔍 Obtener usuario por ID
  getUserById(id: number): Observable<UserMember | undefined> {
    return of(this.users.find(u => u.id === id)).pipe(delay(200));
  }

  // ➕ Crear nuevo usuario
createUser(user: UserMember): Observable<UserMember> {
  const newUser = { ...user, id: this.getNextId() }; // ✅
  this.users.push(newUser);
  return of(newUser).pipe(delay(300));
}


  // ✏️ Actualizar usuario existente
  updateUser(user: UserMember): Observable<UserMember> {
    const index = this.users.findIndex(u => u.id === user.id);
    if (index !== -1) {
      this.users[index] = { ...user };
    }
    return of(user).pipe(delay(300));
  }

  // ❌ Eliminar usuario por ID
  deleteUser(id: number): Observable<void> {
    this.users = this.users.filter(u => u.id !== id);
    return of(undefined).pipe(delay(200));
  }
}
