import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Client } from '../models/client';

@Injectable({ providedIn: 'root' })
export class MockClientService {
  private clients: Client[] = [
    { id: 1, name: 'Juan', lastname: 'Pérez', telephone: '123456789', email: 'juan@example.com' },
    { id: 2, name: 'Ana', lastname: 'Gómez', telephone: '987654321', email: 'ana@example.com' }
  ];

  getAll(): Observable<Client[]> {
    return of([...this.clients]).pipe(delay(300));
  }

  create(client: Client): Observable<void> {
    const newId = Math.max(...this.clients.map(c => c.id), 0) + 1;
    this.clients.push({ ...client, id: newId });
    return of(void 0).pipe(delay(300));
  }

  update(id: number, client: Client): Observable<void> {
    const index = this.clients.findIndex(c => c.id === id);
    if (index !== -1) this.clients[index] = { ...client, id };
    return of(void 0).pipe(delay(300));
  }

  delete(id: number): Observable<void> {
    this.clients = this.clients.filter(c => c.id !== id);
    return of(void 0).pipe(delay(300));
  }
}
