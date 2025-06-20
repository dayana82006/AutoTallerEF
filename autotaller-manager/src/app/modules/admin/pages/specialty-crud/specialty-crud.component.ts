import { Component, OnInit } from '@angular/core';
import { Specialty } from '../../../../models/specialty.model';
import { MockSpecialtyService } from '../../../../core/services/mock-specialty';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-specialty-crud',
  templateUrl: './specialty-crud.component.html',
  imports: [CommonModule, FormsModule],
})
export class SpecialtyCrudComponent implements OnInit {
  specialties: Specialty[] = [];
  newSpecialty: Specialty = { id: 0, name: '' };
  editMode = false;

  constructor(private specialtyService: MockSpecialtyService) {}
search: string = '';
allSpecialties: Specialty[] = []; // copia completa sin filtrar



loadSpecialties() {
  this.specialtyService.getAll().subscribe(data => {
    this.specialties = data;
    this.allSpecialties = [...data]; // guardamos todo para filtrar
  });
}

onSearchChange() {
  const term = this.search.toLowerCase();
  this.specialties = this.allSpecialties.filter(s =>
    s.name.toLowerCase().includes(term)
  );
}

  ngOnInit(): void {
    this.loadSpecialties();
  }
  
  save() {
    if (this.editMode) {
      this.specialtyService.update(this.newSpecialty.id, this.newSpecialty).subscribe(() => {
        this.loadSpecialties();
        this.cancel();
      });
    } else {
      this.specialtyService.create(this.newSpecialty).subscribe(() => {
        this.loadSpecialties();
        this.cancel();
      });
    }
  }

  edit(s: Specialty) {
    this.newSpecialty = { ...s };
    this.editMode = true;
  }

  delete(id: number) {
    if (confirm('¿Estás segura de eliminar esta especialidad?')) {
      this.specialtyService.delete(id).subscribe(() => this.loadSpecialties());
    }
  }

  cancel() {
    this.newSpecialty = { id: 0, name: '' };
    this.editMode = false;
  }
  
}
