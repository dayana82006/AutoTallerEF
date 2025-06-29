import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Client } from '../../models/client';
import { MockClientService } from '../../services/mock-client';
import { SwalService } from '../../../../shared/swal.service';

@Component({
  selector: 'app-client-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './client-form.component.html'
})
export class ClientFormComponent implements OnInit {
  @Input() clientToEdit?: Client;
  @Output() formSubmitted = new EventEmitter<void>();
  @Output() cancelForm = new EventEmitter<void>();

  client: Client = {
    id: 0,
    name: '',
    lastname: '',
    telephone: '',
    email: '',
    createdAt: new Date(),
    updatedAt: new Date()
  };

  editMode = false;

  constructor(
    private clientService: MockClientService,
    private swalService: SwalService
  ) {}

  ngOnInit(): void {
    if (this.clientToEdit) {
      this.client = { ...this.clientToEdit };
      this.editMode = true;
    }
  }

  save(): void {
    const now = new Date();

    this.clientService.getAll().subscribe(existingClients => {
      const emailExists = existingClients.some(c =>
        c.email.toLowerCase() === this.client.email.toLowerCase() &&
        (!this.editMode || c.id !== this.client.id)
      );

      const phoneExists = existingClients.some(c =>
        c.telephone === this.client.telephone &&
        (!this.editMode || c.id !== this.client.id)
      );

      if (emailExists) {
        this.swalService.error('Ya existe un cliente con este correo electrónico.');
        return;
      }

      if (phoneExists) {
        this.swalService.error('Ya existe un cliente con este número de teléfono.');
        return;
      }

      if (this.editMode) {
        this.client.updatedAt = now;
        this.clientService.update(this.client.id, this.client).subscribe(() => {
          this.formSubmitted.emit();
        });
      } else {
        this.client.createdAt = now;
        delete this.client.updatedAt;
        this.clientService.create(this.client).subscribe(() => {
          this.formSubmitted.emit();
        });
      }
    });
  }

  cancel(): void {
    this.cancelForm.emit();
  }
}
