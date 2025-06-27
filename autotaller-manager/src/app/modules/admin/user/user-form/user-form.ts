import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MockUserService } from '../../services/mock-user';
import { UserMember } from '../../models/user-member';
import { SwalService } from '../../../../shared/swal.service';
import { MockSpecialtyService } from '../../services/mock-specialty';
import { Specialty } from '../../models/specialty';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-form.html',
  styleUrls: ['./user-form.scss']
})
export class UserFormComponent implements OnInit {
    formSubmitted: boolean = false;
  user: UserMember = {
    id: 0, 
    name: '',
    username: '',
    lastname: '',
    email: '',
    role: 'Admin', 
    specialties: []
  };

  editingId: number | null = null;
  isEditMode = false;
  availableRoles = ['Admin', 'Mecánico', 'Recepcionista'];
  availableSpecialties: Specialty[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: MockUserService,
    private swalService: SwalService,
    private specialtyService: MockSpecialtyService
  ) {}

  ngOnInit(): void {
  this.specialtyService.getAll().subscribe(data => {
    this.availableSpecialties = data;
  });

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
      username: '',
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
          username: u.username,
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

  const trimmedName = this.user.name.trim();
  const trimmedLastName = this.user.lastname.trim();
  const trimmedEmail = this.user.email.trim();
  const trimmedRole = this.user.role.trim();
  const trimmedUsername = this.user.username.trim();
  const trimmedPassword = this.user.password?.trim();

  // Validación extra para creación
  if (!this.isEditMode) {
    if (!trimmedPassword || trimmedPassword.length < 6) {
      this.swalService.error('La contraseña es obligatoria y debe tener al menos 6 caracteres.');
      return;
    }
  }

  if (this.isEditMode && this.editingId !== null) {
    // Modo edición: NO se envía contraseña
    const userToUpdate: UserMember = {
      id: this.editingId,
      name: trimmedName,
      lastname: trimmedLastName,
      email: trimmedEmail,
      role: trimmedRole,
      username: trimmedUsername,
      specialties: this.user.specialties || []
    };

    this.userService.updateUser(this.editingId, userToUpdate).subscribe({
      next: (updatedUser) => {
        console.log('Usuario actualizado:', updatedUser);


        this.swalService.success('Usuario actualizado correctamente');
        this.router.navigate(['/admin/usuarios']);
      },
      error: (error) => {
        console.error('Error al actualizar usuario:', error);
        this.swalService.error('Error al actualizar el usuario');
      }
    });
  } else {
    // Modo creación: se envía todo, incluida la contraseña
    const newUserData: Omit<UserMember, 'id'> = {
      name: trimmedName,
      lastname: trimmedLastName,
      email: trimmedEmail,
      role: trimmedRole,
      username: trimmedUsername,
      password: trimmedPassword,
      specialties: this.user.specialties || []
    };

    this.userService.createUser(newUserData).subscribe({
      next: (createdUser) => {
        console.log('Usuario creado con ID:', createdUser.id);
        this.swalService.success('Usuario creado correctamente');
        this.router.navigate(['/admin/usuarios']);
        this.resetForm();
      },
      error: (error) => {
        console.error('Error al crear usuario:', error);
        this.swalService.error('Error al crear el usuario');
      }
    });
  }
}
resetForm(): void {
  this.user = {
    id: 0,
    name: '',
    lastname: '',
    email: '',
    role: '',
    username: '',
    password: '',
    specialties: []
  };
  this.isEditMode = false;
  this.editingId = null;
}


  cancel(): void {
    this.router.navigate(['/admin/usuarios']);
  }
}