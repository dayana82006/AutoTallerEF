import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserMember } from '../models/user-member';

@Injectable({ providedIn: 'root' })
export class MockUserService {
  private readonly apiUrl = 'http://localhost:5005/api/UserMember';

  constructor(private http: HttpClient) {}

  getAll(): Observable<UserMember[]> {
    return this.http.get<UserMember[]>(this.apiUrl);
  }

  getUserById(id: number): Observable<UserMember> {
    return this.http.get<UserMember>(`${this.apiUrl}/${id}`);
  }

  createUser(user: Omit<UserMember, 'id' | 'createdAt' | 'updatedAt'>): Observable<UserMember> {
    return this.http.post<UserMember>(this.apiUrl, user);
  }

  updateUser(id: number, user: UserMember): Observable<UserMember> {
    return this.http.put<UserMember>(`${this.apiUrl}/${id}`, user);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getUsers(search: string = '', page: number = 1, pageSize: number = 10): Observable<{ users: UserMember[], total: number }> {
    const params = new HttpParams()
      .set('search', search)
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<{ users: UserMember[], total: number }>(`${this.apiUrl}/paged`, { params });
  }

  resetToDefaults(): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/reset`, {});
  }

  getUserStats(): Observable<{ total: number, byRole: Record<string, number> }> {
    return this.http.get<{ total: number, byRole: Record<string, number> }>(`${this.apiUrl}/stats`);
  }

  emailExists(email: string, excludeId?: number): Observable<boolean> {
    let params = new HttpParams().set('email', email);
    if (excludeId !== undefined) {
      params = params.set('excludeId', excludeId.toString());
    }
    return this.http.get<boolean>(`${this.apiUrl}/email-exists`, { params });
  }
}
