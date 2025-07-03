import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { Client } from "../../models/client";
import { MockClientService } from "../../services/mock-client";
import { MockVehicleService } from "../../services/mock-vehicle";
import { ClientFormComponent } from "../client-form/client-form.component";
import { SwalService } from "../../../../shared/swal.service";
import { AuthService } from '../../../auth/services/auth';

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
  showForm = false;
  total = 0;
  page = 1;
  pageSize = 5;
  search = '';

  constructor(
    private clientService: MockClientService,
    private vehicleService: MockVehicleService,
    private swalService: SwalService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients(): void {
    this.clientService.getAll().subscribe((data) => {
      this.allClients = data;
      this.applyFilters();
    });
  }

  applyFilters(): void {
    const filtered = this.allClients.filter((client) =>
      (client.name + ' ' + client.lastname).toLowerCase().includes(this.search.toLowerCase()) ||
      client.email.toLowerCase().includes(this.search.toLowerCase()) ||
      client.telephone.includes(this.search)
    );

    this.total = filtered.length;
    const start = (this.page - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.clients = filtered.slice(start, end);
  }

  edit(client: Client): void {
    this.selectedClient = client;
    this.showForm = true;
  }

  delete(id: number): void {
    this.vehicleService.getAll().subscribe(vehicles => {
      const hasVehicle = vehicles.some(v => v.clientId === id);

      if (hasVehicle) {
        this.swalService.error(
          'No se puede eliminar el cliente',
          'Este cliente tiene vehículos asignados.'
        );
        return;
      }

      this.swalService.confirm('¿Eliminar cliente?', 'Esta acción no se puede deshacer.').then(confirmed => {
        if (confirmed) {
          this.clientService.delete(id).subscribe(() => {
            this.loadClients();
            this.swalService.success('Cliente eliminado', 'El cliente fue eliminado correctamente.');
          });
        }
      });
    });
  }

  onFormSubmit(): void {
    this.selectedClient = null;
    this.showForm = false;
    this.loadClients();
  }

  newClient(): void {
    this.selectedClient = null;
    this.showForm = true;
  }

  cancelForm(): void {
    this.selectedClient = null;
    this.showForm = false;
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
