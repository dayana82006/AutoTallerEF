import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MockUserService } from '../../services/mock-user.service';
import { UserMember } from '../../../../models/user-member.model';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-form.html',
  styleUrls: ['./user-form.scss']
})
export class UserFormComponent implements OnInit {
  user: UserMember = {
    id: 0,
    name: '',
    lastname: '',
    email: '',
    role: '',
    specialties: []
  };

  isEditMode = false;
  availableRoles = ['Admin', 'Mecánico', 'Recepcionista'];
  availableSpecialties = ['Motor', 'Electricidad', 'Suspensión'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: MockUserService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.userService.getUserById(+id).subscribe((u) => {
        if (u) {
          this.user = { ...u };
        }
      });
    }
  }

  toggleSpecialty(specialty: string): void {
    const index = this.user.specialties.indexOf(specialty);
    if (index >= 0) {
      this.user.specialties.splice(index, 1);
    } else {
      this.user.specialties.push(specialty);
    }
  }

  saveUser(): void {
    if (this.isEditMode) {
      this.userService.updateUser(this.user).subscribe(() => {
        this.router.navigate(['/admin/usuarios']);
      });
    } else {
      this.userService.createUser(this.user).subscribe(() => {
        this.router.navigate(['/admin/usuarios']);
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/admin/usuarios']);
  }
}
