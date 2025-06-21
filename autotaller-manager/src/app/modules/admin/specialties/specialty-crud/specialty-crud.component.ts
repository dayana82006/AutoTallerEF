import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Specialty } from '../../models/specialty';
import { MockSpecialtyService } from '../../services/mock-specialty';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-specialty-crud',
  templateUrl: './specialty-crud.component.html',
  imports: [CommonModule, FormsModule],
})
export class SpecialtyCrudComponent implements OnInit {
  specialties: Specialty[] = [];
  allSpecialties: Specialty[] = [];
  newSpecialty: Specialty = { id: 0, name: '' };
  editMode = false;
  search: string = '';

  @ViewChild('formSection') formSection!: ElementRef;

  constructor(private specialtyService: MockSpecialtyService) {}

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
  const trimmedName = this.newSpecialty.name?.trim().toLowerCase();

  if (!trimmedName || trimmedName.length < 3) {
    alert('El nombre de la especialidad es obligatorio y debe tener al menos 3 caracteres.');
    return;
  }

  const nameExists = this.allSpecialties.some(s =>
    s.name.toLowerCase() === trimmedName && s.id !== this.newSpecialty.id
  );

  if (nameExists) {
    alert('Ya existe una especialidad con ese nombre.');
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


  resetForm() {
    this.newSpecialty = { id: 0, name: '' };
    this.editMode = false;
    this.loadSpecialties();
  }

  edit(s: Specialty) {
    this.newSpecialty = { ...s };
    this.editMode = true;

    setTimeout(() => {
      this.formSection?.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 0);
  }

  delete(id: number) {
    if (confirm('¿Estás segura de eliminar esta especialidad?')) {
      this.specialtyService.delete(id).subscribe(() => this.loadSpecialties());
    }
  }

  cancel() {
    this.resetForm();
  }
}
