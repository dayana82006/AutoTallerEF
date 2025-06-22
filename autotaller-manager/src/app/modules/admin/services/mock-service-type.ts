import { Injectable } from '@angular/core';
import { ServiceType } from '../models/service-type';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MockServiceTypeService {
  private serviceTypes: ServiceType[] = [
    { id: 1, description: 'Cambio de aceite' },
    { id: 2, description: 'Alineación y balanceo' },
    { id: 3, description: 'Revisión de frenos' },
    { id: 4, description: 'Cambio de batería' }
  ];

  getAll(): Observable<ServiceType[]> {
    return of(this.serviceTypes).pipe(delay(300));
  }

  create(serviceType: Omit<ServiceType, 'id'>): Observable<ServiceType> {
    const newId = this.serviceTypes.length > 0
      ? Math.max(...this.serviceTypes.map(s => s.id)) + 1
      : 1;
    const newServiceType: ServiceType = { id: newId, ...serviceType };
    this.serviceTypes.push(newServiceType);
    return of(newServiceType).pipe(delay(300));
  }

  update(id: number, updated: ServiceType): Observable<ServiceType | undefined> {
    const index = this.serviceTypes.findIndex(s => s.id === id);
    if (index !== -1) {
      this.serviceTypes[index] = { ...updated };
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
