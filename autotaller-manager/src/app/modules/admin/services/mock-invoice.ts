import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Invoice } from '../models/invoice';

@Injectable({
  providedIn: 'root'
})
export class MockInvoiceService {
  private readonly API_URL = 'http://localhost:5005/api/Invoice'; 

  constructor(private http: HttpClient) {}

  getInvoices(): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(this.API_URL);
  }

  getInvoiceById(id: number): Observable<Invoice> {
    return this.http.get<Invoice>(`${this.API_URL}/${id}`);
  }

  getInvoiceByServiceOrderId(serviceOrderId: number): Observable<Invoice> {
    return this.http.get<Invoice>(`${this.API_URL}/ByServiceOrder/${serviceOrderId}`);
  
  }

  createInvoice(invoice: Omit<Invoice, 'id' | 'createdAt'>): Observable<Invoice> {
    return this.http.post<Invoice>(this.API_URL, invoice);
  }

  updateInvoice(id: number, updatedInvoice: Invoice): Observable<Invoice> {
    return this.http.put<Invoice>(`${this.API_URL}/${id}`, updatedInvoice);
  }

  deleteInvoice(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.API_URL}/${id}`);
  }
}
