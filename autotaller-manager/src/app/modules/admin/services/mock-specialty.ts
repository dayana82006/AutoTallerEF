import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Specialty } from '../models/specialty';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class MockSpecialtyService {
  private readonly apiUrl = 'http://localhost:5005/api/Specialty';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Specialty[]> {
    return this.http.get<Specialty[]>(this.apiUrl);
  }

  getById(id: number): Observable<Specialty> {
    return this.http.get<Specialty>(`${this.apiUrl}/${id}`);
  }

  create(specialty: Omit<Specialty, 'id' | 'createdAt' | 'updatedAt'>): Observable<Specialty> {
    return this.http.post<Specialty>(this.apiUrl, specialty);
  }

  update(id: number, specialty: Specialty): Observable<Specialty> {
    return this.http.put<Specialty>(`${this.apiUrl}/${id}`, specialty);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

