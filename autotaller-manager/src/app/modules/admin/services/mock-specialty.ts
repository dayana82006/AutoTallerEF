import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Specialty } from '../models/specialty';

@Injectable({
  providedIn: 'root'
})
export class MockSpecialtyService {
  private specialties: Specialty[] = [
    { id: 1, name: 'Mecánica General', createdAt: new Date(), updatedAt: undefined  },
    { id: 2, name: 'Electricidad Automotriz',createdAt: new Date(), updatedAt: undefined  },
    { id: 3, name: 'Frenos y Suspensión', createdAt: new Date(), updatedAt: undefined  }
  ];

  getAll(): Observable<Specialty[]> {
    return of([...this.specialties]).pipe(delay(300)); 
  }

  getById(id: number): Observable<Specialty | undefined> {
    const found = this.specialties.find(s => s.id === id);
    return of(found ? { ...found } : undefined).pipe(delay(300));
  }

create(specialty: Specialty): Observable<Specialty> {
  const newId = this.specialties.length > 0
    ? Math.max(...this.specialties.map(s => s.id)) + 1
    : 1;

  const now = new Date();
  const newSpecialty = { ...specialty, id: newId, createdAt: now, updatedAt: undefined };

  this.specialties.push(newSpecialty);

  return of(newSpecialty).pipe(delay(300));
}

update(id: number, specialty: Specialty): Observable<Specialty> {
  const index = this.specialties.findIndex(s => s.id === id);
  if (index > -1) {
    const existing = this.specialties[index];
    this.specialties[index] = {
      ...existing,
      ...specialty,
      id,
      createdAt: existing.createdAt || new Date(),
      updatedAt: new Date()
    };
    return of(this.specialties[index]).pipe(delay(300));
  }
  return of(specialty).pipe(delay(300));
}


  delete(id: number): Observable<void> {
    console.log('Eliminando especialidad con ID:', id);
    this.specialties = this.specialties.filter(s => s.id !== id);
    return of(undefined).pipe(delay(300));
  }
}
