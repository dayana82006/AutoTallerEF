import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { VehicleAnormality } from '../../models/vehicle-anormality';
import { VehicleAnormalityDetail } from '../../models/vehicle-anormality-detail';
import { Vehicle } from '../../models/vehicle';
import { MockAnormalityService } from '../../services/mock-anormality';
import { MockAnormalityDetailService } from '../../services/mock-anormality-detail';
import { MockVehicleService } from '../../services/mock-vehicle';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { of, forkJoin } from 'rxjs';
import { SwalService } from '../../../../shared/swal.service';

@Component({
  selector: 'app-vehicle-anormality-crud',
  templateUrl: './abnormalities-crud.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class VehicleAnormalityCrudComponent implements OnInit {
  anormalities: VehicleAnormality[] = [];
  allAnormalities: VehicleAnormality[] = [];
  details: VehicleAnormalityDetail[] = [];
  vehicles: Vehicle[] = [];
  selectedSerials: string[] = [];

  newAnormality: VehicleAnormality = { id: 0, name: '', entryDate: '' };
  editMode = false;
  search: string = '';

  @ViewChild('formSection') formSection!: ElementRef;

  constructor(
    private anormalityService: MockAnormalityService,
    private detailService: MockAnormalityDetailService,
    private vehicleService: MockVehicleService,
    private swalService: SwalService
  ) {}

  ngOnInit(): void {
    this.loadAnormalities();
    this.loadDetails();
    this.loadVehicles();
  }

  loadAnormalities() {
    this.anormalityService.getAll().subscribe(data => {
      this.anormalities = data;
      this.allAnormalities = [...data];
    });
  }

loadDetails() {
  this.detailService.getAll().subscribe(data => {
    this.details = data.map(d => ({
      ...d,
      createdAt: d.createdAt ? new Date(d.createdAt) : undefined,
      updatedAt: d.updatedAt ? new Date(d.updatedAt) : undefined
    }));
  });
}



  loadVehicles() {
    this.vehicleService.getVehicles().subscribe(data => {
      this.vehicles = [...data];
    });
  }

  onSearchChange() {
    const term = this.search.toLowerCase();
    this.anormalities = this.allAnormalities.filter(a =>
      a.name.toLowerCase().includes(term)
    );
  }
save() {
  const trimmedName = this.newAnormality.name?.trim();

  if (!trimmedName || trimmedName.length < 3) {
    this.swalService.error('El nombre de la anormalidad es obligatorio y debe tener al menos 3 caracteres.');
    return;
  }

  const nameExists = this.allAnormalities.some(a =>
    a.name.toLowerCase() === trimmedName.toLowerCase() && a.id !== this.newAnormality.id
  );

  if (nameExists) {
    this.swalService.error('Ya existe una anormalidad con ese nombre.');
    return;
  }

  const entry = {
    name: trimmedName,
    entryDate: this.newAnormality.entryDate || new Date().toISOString().split('T')[0]
  };

  const saveAnormality$ = this.editMode && this.newAnormality.id > 0
    ? this.anormalityService.update(this.newAnormality.id, { ...this.newAnormality, name: trimmedName })
    : this.anormalityService.create(entry);

  saveAnormality$.subscribe((createdOrUpdated: any) => {
    const anormalityId = this.editMode ? this.newAnormality.id : createdOrUpdated.id;

    this.detailService.getAll().subscribe(existingDetails => {
      const currentDetails = existingDetails.filter(d => d.idAnormality === anormalityId);

      const serialsToDelete = currentDetails
        .filter(d => !this.selectedSerials.includes(d.serialNumber))
        .map(d => d.id);

      const serialsToAdd = this.selectedSerials.filter(serial =>
        !currentDetails.some(d => d.serialNumber === serial)
      );

      const serialsToUpdate = currentDetails.filter(d =>
        this.selectedSerials.includes(d.serialNumber)
      );

      const deleteRequests = serialsToDelete.map(id => this.detailService.delete(id));
      const addRequests = serialsToAdd.map(serial =>
        this.detailService.create({
          idAnormality: anormalityId,
          serialNumber: serial
        })
      );
      const updateRequests = serialsToUpdate.map(d =>
        this.detailService.update(d.id, {
          ...d,
          updatedAt: new Date()
        })
      );

      forkJoin([
        ...deleteRequests,
        ...addRequests,
        ...updateRequests
      ]).subscribe(() => {
        this.anormalityService.getAll().subscribe(anorms => {
          this.detailService.getAll().subscribe(dets => {
            this.anormalities = [...anorms];
            this.allAnormalities = [...anorms];
            this.details = dets.map(d => ({
              ...d,
              createdAt: d.createdAt ? new Date(d.createdAt) : undefined,
              updatedAt: d.updatedAt ? new Date(d.updatedAt) : undefined
            }));
            this.resetForm();
          });
        });
      });
    });
  });
}


  getDetailsByAnormalityId(anormalityId: number): VehicleAnormalityDetail[] {
    return this.details.filter(d => d.idAnormality === anormalityId);
  }

  resetForm() {
    this.newAnormality = { id: 0, name: '', entryDate: '' };
    this.selectedSerials = [];
    this.editMode = false;
    this.loadAnormalities();
  }

  edit(anormality: VehicleAnormality) {
    this.newAnormality = { ...anormality };
    this.editMode = true;
    this.selectedSerials = this.getDetailsByAnormalityId(anormality.id).map(d => d.serialNumber);

    setTimeout(() => {
      this.formSection?.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }, 0);
  }

delete(id: number): void {
  this.swalService.confirm('¿Eliminar anormalidad?', 'Se eliminarán también sus detalles relacionados. Esta acción no se puede deshacer.')
    .then(confirmed => {
      if (confirmed) {
        this.anormalityService.delete(id).subscribe(() => {
          this.detailService.getAll().subscribe(data => {
            const related = data.filter(d => d.idAnormality === id);
            const deleteRequests = related.map(d => this.detailService.delete(d.id));
            forkJoin(deleteRequests).subscribe(() => {
              this.loadAnormalities();
              this.loadDetails();
              this.swalService.success('Anormalidad eliminada', 'La anormalidad y sus detalles fueron eliminados correctamente.');
            });
          });
        });
      }
    });
}


  cancel() {
    this.resetForm();
  }
}
