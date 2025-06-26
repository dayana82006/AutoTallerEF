import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserMember } from '../models/user-member'; // asegúrate que el modelo exista
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `${environment.apiUrl}/users`; 

  constructor(private http: HttpClient) {}

  /**
   * Obtener todos los usuarios
   */
  getUsers(): Observable<UserMember[]> {
    return this.http.get<UserMember[]>(this.apiUrl);
  }

  /**
   * Obtener un usuario por su ID
   */
  getUserById(id: number): Observable<UserMember> {
    return this.http.get<UserMember>(`${this.apiUrl}/${id}`);
  }

  /**
   * Crear un nuevo usuario
   */
  createUser(user: UserMember): Observable<UserMember> {
    return this.http.post<UserMember>(this.apiUrl, user);
  }

  /**
   * Actualizar un usuario existente
   */
  updateUser(id: number, user: UserMember): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, user);
  }

  /**
   * Eliminar un usuario
   */
  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
