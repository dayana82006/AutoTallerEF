import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';
import { UserMember } from '../../models/user-member';
import { SwalService } from '../../../../shared/swal.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-list.html',
  styleUrls: ['./user-list.scss']
})
export class UserListComponent implements OnInit {
  users: UserMember[] = [];
  filteredUsers: UserMember[] = [];
  total = 0;
  page = 1;
  pageSize = 5;
  search = '';

  constructor(
    private userService: UserService,
    private swalService: SwalService
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe({
      next: data => {
        this.users = data;
        this.applyFilters();
      },
      error: err => {
        console.error('❌ Error al obtener usuarios:', err);
      }
    });
  }

  applyFilters(): void {
    const searchLower = this.search.toLowerCase();
    this.filteredUsers = this.users.filter(user =>
      user.name.toLowerCase().includes(searchLower) ||
      user.lastname.toLowerCase().includes(searchLower) ||
      user.email.toLowerCase().includes(searchLower) ||
      user.role.toLowerCase().includes(searchLower)
    );

    this.total = this.filteredUsers.length;
  }

  get pagedUsers(): UserMember[] {
    const start = (this.page - 1) * this.pageSize;
    return this.filteredUsers.slice(start, start + this.pageSize);
  }

  onSearchChange(): void {
    this.page = 1;
    this.applyFilters();
  }

  onPageChange(newPage: number): void {
    this.page = newPage;
  }

  deleteUser(id: number): void {
    this.swalService.confirm('¿Eliminar usuario?', 'Esta acción no se puede deshacer.').then(confirmed => {
      if (confirmed) {
        this.userService.deleteUser(id).subscribe({
          next: () => {
            this.loadUsers(); // recargar usuarios luego de eliminar
          },
          error: err => {
            console.error('❌ Error al eliminar usuario:', err);
          }
        });
      }
    });
  }
}
