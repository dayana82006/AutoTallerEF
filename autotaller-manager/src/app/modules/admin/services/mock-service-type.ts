import { Injectable } from '@angular/core';
import { ServiceType } from '../models/service-type';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MockServiceTypeService {
  private serviceTypes: ServiceType[] = [
    { id: 1, description: 'Cambio de aceite', createdAt: new Date(), updatedAt: undefined },
    { id: 2, description: 'Alineación y balanceo', createdAt: new Date(), updatedAt: undefined },
    { id: 3, description: 'Revisión de frenos', createdAt: new Date(), updatedAt: undefined },
    { id: 4, description: 'Cambio de batería', createdAt: new Date(), updatedAt: undefined }
  ];

  getAll(): Observable<ServiceType[]> {
    return of([...this.serviceTypes]).pipe(delay(300));
  }

  getById(id: number): Observable<ServiceType | undefined> {
    const found = this.serviceTypes.find(s => s.id === id);
    return of(found ? { ...found } : undefined).pipe(delay(300));
  }

  create(serviceType: Omit<ServiceType, 'id'>): Observable<ServiceType> {
    const newId = this.serviceTypes.length > 0
      ? Math.max(...this.serviceTypes.map(s => s.id)) + 1
      : 1;

    const now = new Date();
    const newServiceType: ServiceType = {
      ...serviceType,
      id: newId,
      createdAt: now,
      updatedAt: undefined
    };

    this.serviceTypes.push(newServiceType);
    return of(newServiceType).pipe(delay(300));
  }

  update(id: number, updated: ServiceType): Observable<ServiceType | undefined> {
    const index = this.serviceTypes.findIndex(s => s.id === id);
    if (index !== -1) {
      const existing = this.serviceTypes[index];
      this.serviceTypes[index] = {
        ...existing,
        ...updated,
        id,
        createdAt: existing.createdAt || new Date(),
        updatedAt: new Date()
      };
      return of(this.serviceTypes[index]).pipe(delay(300));
    }
    return of(undefined).pipe(delay(300));
  }

  delete(id: number): Observable<boolean> {
    const index = this.serviceTypes.findIndex(s => s.id === id);
    if (index !== -1) {
      this.serviceTypes.splice(index, 1);
      return of(true).pipe(delay(300));
    }
    return of(false).pipe(delay(300));
  }
}
