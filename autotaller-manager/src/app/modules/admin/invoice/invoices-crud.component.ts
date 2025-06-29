import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Invoice } from '../models/invoice';
import { MockInvoiceService } from '../services/mock-invoice';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SwalService } from '../../../shared/swal.service';
import { AuthService } from '../../auth/services/auth';
import { Client } from '../models/client';
import { MockClientService } from '../services/mock-client';

@Component({
  selector: 'app-invoices-crud',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './invoices-crud.component.html'
})
export class InvoicesCrudComponent implements OnInit {
  @ViewChild('formSection') formSection!: ElementRef;
  @ViewChild('invoiceForm') invoiceForm!: NgForm;

  invoices: Invoice[] = [];
  allInvoices: Invoice[] = [];
  clients: Client[] = [];

  search = '';

  newInvoice: Omit<Invoice, 'id' | 'createdAt' | 'updatedAt' | 'invoiceDetails'> = {
    totalSpares: 0,
    totalServices: 0,
    finalAmount: 0,
    clientId: 0
  };

  constructor(
    private invoiceService: MockInvoiceService,
    private clientService: MockClientService,
    private swal: SwalService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadInvoices();
    this.loadClients();
  }

  loadInvoices() {
    this.invoiceService.getInvoices().subscribe((data: Invoice[]) => {
      this.invoices = [...data];
      this.allInvoices = [...data];
    });
  }

  loadClients() {
    this.clientService.getAll().subscribe((data: Client[]) => {
      this.clients = data;
    });
  }

  onSearchChange() {
    const term = this.search.toLowerCase();
    this.invoices = this.allInvoices.filter(inv =>
      inv.clientId.toString().includes(term) ||
      inv.finalAmount.toString().includes(term)
    );
  }

  save() {
    const { totalSpares, totalServices, finalAmount, clientId } = this.newInvoice;

    if (totalSpares < 0 || totalServices < 0 || finalAmount < 0 || clientId <= 0) {
      this.swal.error('Verifica los valores ingresados');
      return;
    }

    const invoiceToSend: Invoice = {
      id: 0,
      totalSpares,
      totalServices,
      finalAmount,
      clientId,
      invoiceDetails: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.invoiceService.createInvoice(invoiceToSend).subscribe({
      next: () => {
        this.swal.success('Factura creada');
        this.resetForm();
        this.loadInvoices();
      },
      error: (error: any) => {
        console.error('Error al guardar factura:', error);
        this.swal.error('Ocurrió un error al guardar la factura.');
      }
    });
  }

  delete(id: number) {
    this.swal.confirm('¿Eliminar factura?', 'Esta acción no se puede deshacer.').then(confirmed => {
      if (confirmed) {
        this.invoiceService.deleteInvoice(id).subscribe(() => {
          this.loadInvoices();
          this.swal.success('Factura eliminada');
        });
      }
    });
  }

  resetForm() {
    this.newInvoice = {
      totalSpares: 0,
      totalServices: 0,
      finalAmount: 0,
      clientId: 0
    };

    if (this.invoiceForm) {
      this.invoiceForm.resetForm();
    }
  }

  getClientName(clientId: number): string {
    const client = this.clients.find(c => c.id === clientId);
    return client ? client.name : `Cliente #${clientId}`;
  }
}
