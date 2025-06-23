import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ServiceType } from '../../models/service-type';
import { MockServiceTypeService } from '../../services/mock-service-type';
import { NgForm, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SwalService } from '../../../../shared/swal.service';
import { AuthService } from '../../../auth/services/auth';

@Component({
  selector: 'app-service-types-crud',
  imports: [CommonModule, FormsModule],
  templateUrl: './services-type-crud.component.html',
})
export class ServiceTypesCrudComponent implements OnInit {
  @ViewChild('formSection') formSection!: ElementRef;
  @ViewChild('typeForm') typeForm!: NgForm;

  search = '';
  editMode = false;
  allServiceTypes: ServiceType[] = [];
  filteredServiceTypes: ServiceType[] = [];

  newType: ServiceType = { id: 0, description: '' };

  constructor(
    private typeService: MockServiceTypeService,
    private swal: SwalService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadTypes();
  }

  loadTypes() {
    this.typeService.getAll().subscribe(data => {
      this.allServiceTypes = [...data];
      this.filteredServiceTypes = [...data];
    });
  }

  applySearch() {
    const term = this.search.trim().toLowerCase();

    if (!term) {
      this.filteredServiceTypes = [...this.allServiceTypes];
      return;
    }

    const result = this.allServiceTypes.filter(t =>
      t.description.toLowerCase().includes(term)
    );

    this.filteredServiceTypes = result;

    if (result.length === 0) {
      this.swal.info('No se encontraron tipos de servicio');
    }

    this.search = '';
  }

  save() {
    const trimmed = this.newType.description.trim();
    if (!trimmed) {
      this.swal.error('La descripción es obligatoria');
      return;
    }

    const save$ = this.editMode
      ? this.typeService.update(this.newType.id, this.newType)
      : this.typeService.create({ description: trimmed });

    save$.subscribe(() => {
      this.swal.success(this.editMode ? 'Tipo actualizado' : 'Tipo creado');
      this.resetForm();
      this.loadTypes();
    });
  }

  edit(type: ServiceType) {
    this.newType = { ...type };
    this.editMode = true;
    setTimeout(() => {
      this.formSection.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }, 0);
  }

  delete(id: number) {
    this.swal.confirm('¿Eliminar tipo de servicio?', 'Esta acción no se puede deshacer.').then(confirmed => {
      if (confirmed) {
        this.typeService.delete(id).subscribe(() => {
          this.loadTypes();
          this.swal.success('Tipo de servicio eliminado');
        });
      }
    });
  }

  cancel() {
    this.resetForm();
  }

  resetForm() {
    this.newType = { id: 0, description: '' };
    this.editMode = false;

    if (this.typeForm) {
      this.typeForm.resetForm();
    }
  }
}