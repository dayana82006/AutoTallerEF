import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model'; // Asegúrate de tener este modelo creado

@Injectable({
  providedIn: 'root' // O puedes usar 'providedIn: AdminModule' si solo se usa ahí
})
export class UserService {
  private apiUrl = '/api/users'; // Usa proxy para evitar problemas de CORS

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

}
