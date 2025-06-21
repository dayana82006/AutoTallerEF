import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Specialty } from './specialty.model';

@Injectable({
  providedIn: 'root'
})
export class MockSpecialtyService {
  private specialties: Specialty[] = [
    { id: 1, name: 'Mecánica General' },
    { id: 2, name: 'Electricidad Automotriz' },
    { id: 3, name: 'Frenos y Suspensión' }
  ];

  getAll(): Observable<Specialty[]> {
    return of([...this.specialties]).pipe(delay(300)); // ⏱️ simula API y evita mutación externa
  }

  getById(id: number): Observable<Specialty | undefined> {
    const found = this.specialties.find(s => s.id === id);
    return of(found ? { ...found } : undefined).pipe(delay(300));
  }

create(specialty: Specialty): Observable<Specialty> {
  const newId = this.specialties.length > 0
    ? Math.max(...this.specialties.map(s => s.id)) + 1
    : 1;

  const newSpecialty = { ...specialty, id: newId };
  this.specialties.push(newSpecialty);

  return of(newSpecialty).pipe(delay(300));
}

  update(id: number, specialty: Specialty): Observable<Specialty> {
    const index = this.specialties.findIndex(s => s.id === id);
    if (index > -1) {
      this.specialties[index] = { ...specialty, id }; // asegura mantener el ID
      return of(this.specialties[index]).pipe(delay(300));
    }
    return of(specialty).pipe(delay(300)); // fallback si no se encuentra
  }

  delete(id: number): Observable<void> {
    console.log('Eliminando especialidad con ID:', id);
    this.specialties = this.specialties.filter(s => s.id !== id);
    return of(undefined).pipe(delay(300));
  }
}
