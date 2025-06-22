import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MockUserService } from '../../services/mock-user';
import { UserMember } from '../../models/user-member';
import { SwalService } from '../../../../shared/swal.service';

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
    role: 'Admin', 
    specialties: []
  };

  editingId: number | null = null;
  isEditMode = false;
  availableRoles = ['Admin', 'Mecánico', 'Recepcionista'];
  availableSpecialties: string[] = ['Motor', 'Electricidad', 'Suspensión', 'Frenos'];  

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: MockUserService,
    private swalService: SwalService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id && id !== '0') {
      this.isEditMode = true;
      this.editingId = +id;
      this.loadUserForEdit(+id);
    } else {
      this.initializeNewUser();
    }
  }

  private initializeNewUser(): void {
    this.user = {
      id: 0,
      name: '',
      lastname: '',
      email: '',
      role: 'Admin',
      specialties: []
    };
  }

  private loadUserForEdit(id: number): void {
    this.userService.getUserById(id).subscribe((u) => {
      if (u) {
        this.user = {
          id: u.id,
          name: u.name,
          lastname: u.lastname,
          email: u.email,
          role: u.role,
          specialties: [...(u.specialties || [])]
        };
      } else {
        this.router.navigate(['/admin/usuarios']);
      }
    });
  }

  toggleSpecialty(specialty: string): void {
    if (!this.user.specialties) {
      this.user.specialties = [];
    }
    
    const index = this.user.specialties.indexOf(specialty);
    if (index >= 0) {
      this.user.specialties.splice(index, 1);
    } else {
      this.user.specialties.push(specialty);
    }
  }

  private isFormValid(): boolean {
    return !!(this.user.name.trim() && 
              this.user.lastname.trim() && 
              this.user.email.trim() && 
              this.user.role);
  }

  saveUser(): void {
    if (!this.isFormValid()) {
      this.swalService.error('Por favor completa todos los campos requeridos');
      return;
    }

    if (this.isEditMode && this.editingId !== null) {
      const userToUpdate: UserMember = {
        ...this.user,
        id: this.editingId
      };
      
      this.userService.updateUser(this.editingId, userToUpdate).subscribe({
        next: (updatedUser) => {
          console.log('Usuario actualizado:', updatedUser);
          this.router.navigate(['/admin/usuarios']);
        },
        error: (error) => {
          console.error('Error al actualizar usuario:', error);
          this.swalService.error('Error al actualizar el usuario');
        }
      });
    } else {
      const newUserData: Omit<UserMember, 'id'> = {
        name: this.user.name.trim(),
        lastname: this.user.lastname.trim(),
        email: this.user.email.trim(),
        role: this.user.role,
        specialties: this.user.specialties || []
      };

      this.userService.createUser(newUserData).subscribe({
        next: (createdUser) => {
          console.log('Usuario creado con ID:', createdUser.id);
          this.router.navigate(['/admin/usuarios']);
        },
        error: (error) => {
          console.error('Error al crear usuario:', error);
          this.swalService.error('Error al crear el usuario');
        }
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/admin/usuarios']);
  }
}