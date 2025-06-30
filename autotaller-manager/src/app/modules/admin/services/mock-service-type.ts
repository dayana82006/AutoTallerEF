import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServiceType } from '../models/service-type';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MockServiceTypeService {
  private baseUrl = 'http://localhost:5005/api/ServiceType';  

  constructor(private http: HttpClient) {}

  getAll(): Observable<ServiceType[]> {
    return this.http.get<ServiceType[]>(this.baseUrl);
  }

  getById(id: number): Observable<ServiceType> {
    return this.http.get<ServiceType>(`${this.baseUrl}/${id}`);
  }

  create(serviceType: Omit<ServiceType, 'id'>): Observable<ServiceType> {
    return this.http.post<ServiceType>(this.baseUrl, serviceType);
  }

  update(id: number, updated: ServiceType): Observable<ServiceType> {
    return this.http.put<ServiceType>(`${this.baseUrl}/${id}`, updated);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
