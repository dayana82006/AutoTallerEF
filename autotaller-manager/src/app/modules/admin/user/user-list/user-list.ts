import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MockUserService } from '../../services/mock-user';
import { UserMember } from '../../models/user-member';
import { SwalService } from '../../../../shared/swal.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
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
    private swalService: SwalService
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers(this.search, this.page, this.pageSize).subscribe(res => {
      this.users = res.users;
      this.total = res.total;
    });
  }

  onSearchChange(): void {
    this.page = 1;
    this.loadUsers();
  }

  onPageChange(newPage: number): void {
    this.page = newPage;
    this.loadUsers();
  }

deleteUser(id: number): void {
  this.swalService.confirm('¿Eliminar usuario?', 'Esta acción no se puede deshacer.').then(confirmed => {
    if (confirmed) {
      this.userService.deleteUser(id).subscribe(() => {
        this.loadUsers();
      });
    }
  });
}

}
