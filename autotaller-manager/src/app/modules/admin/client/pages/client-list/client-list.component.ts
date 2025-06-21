import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MockClientService } from '../../../../../core/services/mock-client';
import { Client } from '../../../../../models/client-model';
import { ClientFormComponent } from '../client-form/client-form.component';

@Component({
  selector: 'app-client-list',
  standalone: true,
  imports: [CommonModule, ClientFormComponent],
  templateUrl: './client-list.component.html'
})
export class ClientListComponent implements OnInit {
  clients: Client[] = [];
  selectedClient?: Client | null;

  constructor(private clientService: MockClientService) {}

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients() {
    this.clientService.getAll().subscribe(data => (this.clients = data));
  }

  edit(client: Client) {
    this.selectedClient = client;
  }

  delete(id: number) {
    if (confirm('¿Estás segura de eliminar este cliente?')) {
      this.clientService.delete(id).subscribe(() => this.loadClients());
    }
  }

  onFormSubmit() {
    this.selectedClient = null;
    this.loadClients();
  }

  newClient() {
    this.selectedClient = null;
  }
}
