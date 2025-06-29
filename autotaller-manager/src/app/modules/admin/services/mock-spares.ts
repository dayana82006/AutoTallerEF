import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Spare } from '../models/spare';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MockSpareService {
  private readonly apiUrl = 'http://localhost:5005/api/Spare'; 

  constructor(private http: HttpClient) {}

  getAll(): Observable<Spare[]> {
    return this.http.get<Spare[]>(this.apiUrl);
  }

create(spare: Omit<Spare, 'createdAt' | 'updatedAt'>): Observable<Spare> {
  return this.http.post<Spare>(this.apiUrl, spare);
}

  update(code: string, spare: Spare): Observable<Spare> {
    return this.http.put<Spare>(`${this.apiUrl}/${code}`, spare);
  }

  delete(code: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${code}`);
  }
}
