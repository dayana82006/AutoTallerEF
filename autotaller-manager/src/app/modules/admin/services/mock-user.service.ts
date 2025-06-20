import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { UserMember } from '../../../models/user-member.model';

@Injectable({ providedIn: 'root' })
export class MockUserService {
  private readonly STORAGE_KEY = 'mock-users-data';
  private users: UserMember[] = [];

  private defaultUsers: UserMember[] = [
    { id: 1, name: 'Juan', lastname: 'Pérez', email: 'juan@example.com', role: 'Admin', specialties: [] },
    { id: 2, name: 'Ana', lastname: 'García', email: 'ana@example.com', role: 'Mecánico', specialties: ['Frenos'] },
    { id: 3, name: 'Luis', lastname: 'Mejía', email: 'luis@example.com', role: 'Recepcionista', specialties: [] },
    { id: 4, name: 'Laura', lastname: 'Torres', email: 'laura@example.com', role: 'Mecánico', specialties: ['Electricidad'] },
    { id: 5, name: 'Carlos', lastname: 'Martínez', email: 'carlos@example.com', role: 'Mecánico', specialties: ['Motor'] },
    { id: 6, name: 'Sandra', lastname: 'Vega', email: 'sandra@example.com', role: 'Admin', specialties: [] }
  ];

  constructor() {
    this.loadUsersFromStorage();
  }

  private loadUsersFromStorage(): void {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        this.users = JSON.parse(stored);
        console.log('Usuarios cargados desde localStorage:', this.users.length);
      } else {
        this.users = [...this.defaultUsers];
        this.saveUsersToStorage();
        console.log('Inicializando con datos por defecto');
      }
    } catch (error) {
      console.error('Error cargando usuarios desde localStorage:', error);
      this.users = [...this.defaultUsers];
    }
  }

  private saveUsersToStorage(): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.users));
      console.log('Usuarios guardados en localStorage');
    } catch (error) {
      console.error('Error guardando usuarios en localStorage:', error);
    }
  }

  getAll(): Observable<UserMember[]> {
    return of([...this.users]).pipe(delay(300));
  }

  getUserById(id: number): Observable<UserMember | undefined> {
    const found = this.users.find(u => u.id === id);
    return of(found ? { ...found } : undefined).pipe(delay(300));
  }

  createUser(user: Omit<UserMember, 'id'>): Observable<UserMember> {
    
    if (!user.name?.trim() || !user.lastname?.trim() || !user.email?.trim()) {
      return throwError(() => new Error('Datos incompletos para crear el usuario'));
    }

    const emailExists = this.users.some(u => u.email.toLowerCase() === user.email.toLowerCase());
    if (emailExists) {
      return throwError(() => new Error('Ya existe un usuario con este correo electrónico'));
    }

    const newId = this.users.length > 0
      ? Math.max(...this.users.map(u => u.id)) + 1
      : 1;

    const newUser: UserMember = { 
      ...user, 
      id: newId,
      name: user.name.trim(),
      lastname: user.lastname.trim(),
      email: user.email.trim(),
      specialties: user.specialties || []
    };

    this.users.push(newUser);
    this.saveUsersToStorage();
    console.log(`Usuario creado con ID: ${newId}`, newUser);
    
    return of({ ...newUser }).pipe(delay(300));
  }

  updateUser(id: number, user: UserMember): Observable<UserMember> {

    if (!user.name?.trim() || !user.lastname?.trim() || !user.email?.trim()) {
      return throwError(() => new Error('Datos incompletos para actualizar el usuario'));
    }

    const index = this.users.findIndex(u => u.id === id);
    if (index === -1) {
      return throwError(() => new Error(`Usuario con ID ${id} no encontrado`));
    }

    const emailExists = this.users.some(u => 
      u.id !== id && u.email.toLowerCase() === user.email.toLowerCase()
    );
    if (emailExists) {
      return throwError(() => new Error('Ya existe otro usuario con este correo electrónico'));
    }

    const updatedUser: UserMember = {
      ...user,
      id: id,
      name: user.name.trim(),
      lastname: user.lastname.trim(),
      email: user.email.trim(),
      specialties: user.specialties || []
    };

    this.users[index] = updatedUser;
    this.saveUsersToStorage();
    console.log(`Usuario actualizado con ID: ${id}`, updatedUser);
    
    return of({ ...updatedUser }).pipe(delay(300));
  }

  deleteUser(id: number): Observable<void> {
    const index = this.users.findIndex(u => u.id === id);
    if (index === -1) {
      return throwError(() => new Error(`Usuario con ID ${id} no encontrado`));
    }

    this.users.splice(index, 1);
    this.saveUsersToStorage(); 
    console.log(`Usuario con ID ${id} eliminado`);
    
    return of(undefined).pipe(delay(300));
  }

  getUsers(search: string = '', page: number = 1, pageSize: number = 10): Observable<{ users: UserMember[], total: number }> {
    if (page < 1) page = 1;
    if (pageSize < 1) pageSize = 10;

    const searchTerm = search.toLowerCase().trim();
    
    const filtered = this.users.filter(u =>
      u.name.toLowerCase().includes(searchTerm) ||
      u.lastname.toLowerCase().includes(searchTerm) ||
      u.email.toLowerCase().includes(searchTerm) ||
      u.role.toLowerCase().includes(searchTerm)
    );

    const total = filtered.length;
    const start = (page - 1) * pageSize;
    const paginated = filtered.slice(start, start + pageSize);

    return of({ 
      users: paginated.map(u => ({ ...u })),
      total 
    }).pipe(delay(300));
  }

  resetToDefaults(): Observable<void> {
    this.users = [...this.defaultUsers];
    this.saveUsersToStorage();
    console.log('Datos reseteados a valores por defecto');
    return of(undefined).pipe(delay(200));
  }

  getUserStats(): Observable<{ total: number, byRole: Record<string, number> }> {
    const total = this.users.length;
    const byRole = this.users.reduce((acc, user) => {
      acc[user.role] = (acc[user.role] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return of({ total, byRole }).pipe(delay(100));
  }

  emailExists(email: string, excludeId?: number): Observable<boolean> {
    const exists = this.users.some(u => 
      u.email.toLowerCase() === email.toLowerCase() && 
      (excludeId === undefined || u.id !== excludeId)
    );
    return of(exists).pipe(delay(200));
  }
}