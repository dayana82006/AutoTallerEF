import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // 👈 Agrega esto
import { MockClientService } from '../../../../../core/services/mock-client';
import { Client } from '../../../../../models/client-model';
import { ClientFormComponent } from '../client-form/client-form.component';

@Component({
  selector: 'app-client-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ClientFormComponent], 
  templateUrl: './client-list.component.html',
})
export class ClientListComponent implements OnInit {
  allClients: Client[] = [];
  clients: Client[] = [];

  selectedClient?: Client | null;
  total = 0;
  page = 1;
  pageSize = 5;
  search = '';

  constructor(private clientService: MockClientService) {}

  ngOnInit(): void {
    this.clientService.getAll().subscribe((data) => {
      this.allClients = data;
      this.applyFilters();
    });
  }

  applyFilters(): void {
    const filtered = this.allClients.filter(client =>
      (client.name + ' ' + client.lastname).toLowerCase().includes(this.search.toLowerCase()) ||
      client.email.toLowerCase().includes(this.search.toLowerCase()) ||
      client.telephone.includes(this.search)
    );

    this.total = filtered.length;
    const start = (this.page - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.clients = filtered.slice(start, end);
  }

  loadClients(): void {
    this.clientService.getAll().subscribe((data) => {
      this.allClients = data;
      this.applyFilters();
    });
  }

  edit(client: Client): void {
    this.selectedClient = client;
  }

  delete(id: number): void {
    if (confirm('¿Estás segura de eliminar este cliente?')) {
      this.clientService.delete(id).subscribe(() => {
        this.loadClients();
      });
    }
  }

  onFormSubmit(): void {
    this.selectedClient = null;
    this.loadClients();
  }

  newClient(): void {
    this.selectedClient = null;
  }

  onSearchChange(): void {
    this.page = 1;
    this.applyFilters();
  }

  onPageChange(newPage: number): void {
    this.page = newPage;
    this.applyFilters();
  }
}
