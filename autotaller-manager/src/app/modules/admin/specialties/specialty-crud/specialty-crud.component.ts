import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Specialty } from '../../models/specialty';
import { MockSpecialtyService } from '../../services/mock-specialty';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgForm } from '@angular/forms';
import { SwalService } from '../../../../shared/swal.service';

@Component({
  selector: 'app-specialty-crud',
  templateUrl: './specialty-crud.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class SpecialtyCrudComponent implements OnInit {
  specialties: Specialty[] = [];
  allSpecialties: Specialty[] = [];
  newSpecialty: Specialty = { id: 0, name: '' };
  editMode = false;
  search: string = '';
  formSubmitted = false;

  @ViewChild('formSection') formSection!: ElementRef;

  constructor(
    private specialtyService: MockSpecialtyService,
    private swalService: SwalService
  ) {}

  ngOnInit(): void {
    this.loadSpecialties();
  }

  loadSpecialties() {
    this.specialtyService.getAll().subscribe(data => {
      this.specialties = data;
      this.allSpecialties = [...data];
    });
  }

  onSearchChange() {
    const term = this.search.toLowerCase();
    this.specialties = this.allSpecialties.filter(s =>
      s.name.toLowerCase().includes(term)
    );
  }

  save() {
    this.formSubmitted = true;

    const trimmedName = this.newSpecialty.name?.trim();

    if (!trimmedName || trimmedName.length < 3) {
      return;
    }

    const nameExists = this.allSpecialties.some(s =>
      s.name.toLowerCase() === trimmedName.toLowerCase() && s.id !== this.newSpecialty.id
    );

    if (nameExists) {
      this.swalService.error('Ya existe una especialidad con ese nombre.');
      return;
    }

    if (this.editMode && this.newSpecialty.id > 0) {
      this.specialtyService
        .update(this.newSpecialty.id, { ...this.newSpecialty, name: trimmedName })
        .subscribe(() => this.resetForm());
    } else {
      this.specialtyService
        .create({ ...this.newSpecialty, name: trimmedName })
        .subscribe(() => this.resetForm());
    }
  }

@ViewChild('form') specialtyForm!: NgForm;

resetForm() {
  this.newSpecialty = { id: 0, name: '' };
  this.editMode = false;
  this.formSubmitted = false;

  if (this.specialtyForm) {
    this.specialtyForm.resetForm(); 
  }

  this.loadSpecialties();
}


  edit(s: Specialty) {
    this.newSpecialty = { ...s };
    this.editMode = true;
    this.formSubmitted = false;

    setTimeout(() => {
      this.formSection?.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 0);
  }

delete(id: number): void {
  this.swalService.confirm('¿Eliminar especialidad?', 'Esta acción no se puede deshacer.').then(confirmed => {
    if (confirmed) {
      this.specialtyService.delete(id).subscribe(() => {
        this.loadSpecialties();
        this.swalService.success('Eliminada', 'La especialidad fue eliminada correctamente.');
      });
    }
  });
}


  cancel() {
    this.resetForm();
  }
}
