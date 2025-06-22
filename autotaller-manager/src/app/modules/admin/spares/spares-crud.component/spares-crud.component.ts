import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Spare } from '../../models/spare';
import { MockSpareService } from '../../services/mock-spares';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SwalService } from '../../../../shared/swal.service';

@Component({
  selector: 'app-spares-crud',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './spares-crud.component.html'
})
export class SparesCrudComponent implements OnInit {
  @ViewChild('formSection') formSection!: ElementRef;
  @ViewChild('spareForm') spareForm!: NgForm;

  spares: Spare[] = [];
  allSpares: Spare[] = [];
  search = '';
  editMode = false;

  newSpare: Spare = {
    id: 0,
    code: '',
    description: '',
    stockQuantity: 0,
    unitPrice: 0
  };

  constructor(
    private spareService: MockSpareService,
    private swal: SwalService
  ) {}

  ngOnInit(): void {
    this.loadSpares();
  }

  loadSpares() {
    this.spareService.getAll().subscribe(data => {
      this.spares = [...data];
      this.allSpares = [...data];
    });
  }

  onSearchChange() {
    const term = this.search.toLowerCase();
    this.spares = this.allSpares.filter(s =>
      s.code.toLowerCase().includes(term) ||
      (s.description ?? '').toLowerCase().includes(term)
    );
  }

save() {
  const trimmedCode = this.newSpare.code.trim();
  const stock = this.newSpare.stockQuantity;
  const price = this.newSpare.unitPrice;

  if (!trimmedCode) {
    this.swal.error('El código del repuesto es obligatorio');
    return;
  }

  if (stock === null || stock === undefined || isNaN(stock) || typeof stock !== 'number') {
    this.swal.error('El stock debe ser un número válido');
    return;
  }

  if (stock < 0) {
    this.swal.error('El stock no puede ser negativo');
    return;
  }

  if (price === null || price === undefined || isNaN(price) || typeof price !== 'number') {
    this.swal.error('El precio debe ser un número válido');
    return;
  }

  if (price < 0) {
    this.swal.error('El precio no puede ser negativo');
    return;
  }

  const save$ = this.editMode
    ? this.spareService.update(this.newSpare.id, this.newSpare)
    : this.spareService.create({
        code: trimmedCode,
        description: this.newSpare.description?.trim() || '',
        stockQuantity: stock,
        unitPrice: price
      });

  save$.subscribe(() => {
    this.swal.success(
      this.editMode ? 'Repuesto actualizado' : 'Repuesto creado'
    );
    this.resetForm();
    this.loadSpares();
  });
}

  edit(spare: Spare) {
    this.newSpare = { ...spare };
    this.editMode = true;
    setTimeout(() => {
    this.formSection.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }, 0);
  }

  delete(id: number) {
    this.swal.confirm('¿Eliminar repuesto?', 'Esta acción no se puede deshacer.').then(confirmed => {
      if (confirmed) {
        this.spareService.delete(id).subscribe(() => {
          this.loadSpares();
          this.swal.success('Repuesto eliminado');
        });
      }
    });
  }

  cancel() {
    this.resetForm();
  }

resetForm() {
  this.newSpare = {
    id: 0,
    code: '',
    description: '',
    stockQuantity: 0,
    unitPrice: 0
  };
  this.editMode = false;

  if (this.spareForm) {
    this.spareForm.resetForm(); 
  }
}

}
