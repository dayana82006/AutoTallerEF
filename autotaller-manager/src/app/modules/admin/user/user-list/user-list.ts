import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, NavigationEnd, RouterModule } from '@angular/router';
import { filter } from 'rxjs/operators';

import { UserMember } from '../../models/user-member';
import { SwalService } from '../../../../shared/swal.service';
import { MockUserService } from '../../services/mock-user';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './user-list.html',
  styleUrls: ['./user-list.scss']
})
export class UserListComponent implements OnInit {
  users: UserMember[] = [];
  total = 0;
  page = 1;
  pageSize = 5;
  search = '';

  constructor(
    private userService: MockUserService,
    private swalService: SwalService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadUsers();

    // 🔄 Forzar recarga de datos cuando se regresa a esta ruta
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        // Si estamos en la ruta de usuarios, recargar
        if (this.router.url.includes('/admin/usuarios')) {
          this.loadUsers();
        }
      });
  }

  loadUsers(): void {
    this.userService.getUsers(this.search, this.page, this.pageSize).subscribe({
      next: response => {
        this.users = response.users;
        this.total = response.total;
      },
      error: err => {
        console.error('❌ Error al obtener usuarios:', err);
      }
    });
  }

  get totalPages(): number {
    return Math.ceil(this.total / this.pageSize);
  }

  onSearchChange(): void {
    this.page = 1;
    this.loadUsers();
  }

  onPageChange(newPage: number): void {
    this.page = newPage;
    this.loadUsers();
  }

  get pagedUsers(): UserMember[] {
    return this.users;
  }

  deleteUser(id: number): void {
    this.swalService.confirm('¿Eliminar usuario?', 'Esta acción no se puede deshacer.').then(confirmed => {
      if (confirmed) {
        this.userService.deleteUser(id).subscribe({
          next: () => this.loadUsers(),
          error: err => console.error('❌ Error al eliminar usuario:', err)
        });
      }
    });
  }
}
