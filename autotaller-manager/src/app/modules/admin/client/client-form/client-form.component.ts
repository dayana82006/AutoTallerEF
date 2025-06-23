import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Client } from '../../models/client';
import { MockClientService } from '../../services/mock-client';

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

  constructor(private clientService: MockClientService) {}

  ngOnInit(): void {
    if (this.clientToEdit) {
      this.client = { ...this.clientToEdit };
      this.editMode = true;
    }
  }

 save(): void {
    const now = new Date();

    if (this.editMode) {
      this.client.updatedAt = now;
      this.clientService.update(this.client.id, this.client).subscribe(() => {
        this.formSubmitted.emit();
      });
  } else {
    this.client.createdAt = new Date();
    delete this.client.updatedAt;
    this.clientService.create(this.client).subscribe(() => {
      this.formSubmitted.emit();
    });
  }
  }

  cancel(): void {
    this.cancelForm.emit();
  }
}
