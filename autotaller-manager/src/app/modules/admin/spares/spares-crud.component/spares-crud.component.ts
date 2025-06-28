import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Spare } from '../../models/spare';
import { MockSpareService } from '../../services/mock-spares';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SwalService } from '../../../../shared/swal.service';
import { AuthService } from '../../../auth/services/auth';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-spares-crud',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './spares-crud.component.html'
})
export class SparesCrudComponent implements OnInit {
  @ViewChild('formSection') formSection!: ElementRef;
  @ViewChild('spareForm') spareForm!: NgForm;
  minStockLevel: number | null = null;
  spares: Spare[] = [];
  allSpares: Spare[] = [];
  search = '';
  editMode = false;

  newSpare: Spare = {
    code: '',
    description: '',
    stockQuantity: 0,
    unitPrice: 0
  };

  constructor(
    private spareService: MockSpareService,
    private swal: SwalService,
    public authService: AuthService
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

    if (stock == null || isNaN(stock) || stock < 0) {
      this.swal.error('El stock debe ser un número válido y no negativo');
      return;
    }

    if (price == null || isNaN(price) || price < 0) {
      this.swal.error('El precio debe ser un número válido y no negativo');
      return;
    }

    if (!this.editMode) {
      const codeExists = this.allSpares.some(s => s.code.trim().toLowerCase() === trimmedCode.toLowerCase());
      if (codeExists) {
        this.swal.error(`Ya existe un repuesto con el código "${trimmedCode}".`);
        return;
      }
    }

    const save$ = this.editMode
      ? this.spareService.update(this.newSpare.code, this.newSpare)
      : this.spareService.create({
          code: trimmedCode,
          description: this.newSpare.description?.trim() || '',
          stockQuantity: stock,
          unitPrice: price
        });

    save$.subscribe({
      next: () => {
        this.swal.success(this.editMode ? 'Repuesto actualizado' : 'Repuesto creado');
        this.resetForm();
        this.loadSpares();
      },
      error: (error) => {
        console.error('Error al guardar repuesto:', error);
        this.swal.error('Ocurrió un error al guardar el repuesto.');
      }
    });
  }

  edit(spare: Spare) {
    this.newSpare = { ...spare };
    this.editMode = true;
    setTimeout(() => {
      this.formSection.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }, 0);
  }

  delete(code: string) {
    this.swal.confirm('¿Eliminar repuesto?', 'Esta acción no se puede deshacer.').then(confirmed => {
      if (confirmed) {
        this.spareService.delete(code).subscribe(() => {
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

  onMinStockFilter() {
    if (typeof this.minStockLevel !== 'number' || isNaN(this.minStockLevel) || this.minStockLevel <= 0) {
      this.spares = [...this.allSpares];
      return;
    }

    this.spares = this.allSpares.filter(s => s.stockQuantity <= this.minStockLevel!);
  }

  applySearch() {
    const term = this.search.trim().toLowerCase();

    if (!term) {
      this.spares = [...this.allSpares];
      return;
    }

    const filtered = this.allSpares.filter(s =>
      s.code.toLowerCase().includes(term) ||
      (s.description ?? '').toLowerCase().includes(term)
    );

    this.spares = filtered;

    if (filtered.length > 0) {
      this.search = '';
    } else {
      this.swal.info('No se encontraron repuestos con ese término');
    }
  }
}
