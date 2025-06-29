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
    role: [''],  
    specialties: []
  };

  editingId: number | null = null;
  isEditMode = false;
  availableRoles = ['Admin', 'Mecánico', 'Recepcionista'];
  availableSpecialties: Specialty[] = [];
  allUsers: UserMember[] = [];

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

    this.userService.getUsers('', 1, 1000).subscribe(response => {
      this.allUsers = response.users;
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
      role: ['Admin'],
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
          role: Array.isArray(u.role) ? u.role : [u.role],
          specialties: [...(u.specialties || [])]
        };
      } else {
        this.router.navigate(['/admin/usuarios']);
      }
    });
  }

  toggleSpecialty(specialty: string): void {
    if (!this.user.specialties) this.user.specialties = [];

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
              this.user.role && this.user.role.length > 0);
  }

  saveUser(): void {
    if (!this.isFormValid()) {
      this.swalService.error('Por favor completa todos los campos requeridos');
      return;
    }

  const trimmedName = this.user.name.trim();
  const trimmedLastName = this.user.lastname.trim();
  const trimmedEmail = this.user.email.trim();
  const trimmedRole = this.user.role.map(r => r.trim());
  const trimmedUsername = this.user.username.trim();
  const trimmedPassword = this.user.password?.trim();

    const duplicateEmail = this.allUsers.some(u =>
      u.email.trim().toLowerCase() === trimmedEmail &&
      (!this.isEditMode || u.id !== this.user.id)
    );

    if (duplicateEmail) {
      this.swalService.error('El correo ya está en uso por otro usuario');
      return;
    }

    const duplicateUsername = this.allUsers.some(u =>
      u.username.trim().toLowerCase() === trimmedUsername &&
      (!this.isEditMode || u.id !== this.user.id)
    );

    if (duplicateUsername) {
      this.swalService.error('El nombre de usuario ya existe');
      return;
    }

    if (!this.isEditMode && (!trimmedPassword || trimmedPassword.length < 6)) {
      this.swalService.error('La contraseña es obligatoria y debe tener al menos 6 caracteres.');
      return;
    }

    const userPayload: UserMember = {
      id: this.isEditMode ? this.user.id : 0,
      name: this.user.name.trim(),
      lastname: this.user.lastname.trim(),
      email: trimmedEmail,
      username: trimmedUsername,
      role: this.user.role?.map(r => r.trim()) || [],
      specialties: this.user.specialties || []
    };

    if (this.isEditMode) {
      this.userService.updateUser(this.user.id, userPayload).subscribe({
        next: () => {
          this.swalService.success('Usuario actualizado correctamente');
          this.router.navigate(['/admin/usuarios']);
        },
        error: (err) => {
          console.error(err);
          const errMsg = (err?.error || '').toString().toLowerCase();

          if (errMsg.includes('email')) {
            this.swalService.error('Ya existe un usuario con ese correo');
          } else if (errMsg.includes('username')) {
            this.swalService.error('Ya existe un usuario con ese nombre de usuario');
          } else {
            this.swalService.error('Error al actualizar el usuario');
          }
        }
      });
    } else {
      const newUser: Omit<UserMember, 'id'> = {
        ...userPayload,
        password: trimmedPassword!
      };

    this.userService.createUser(newUser).subscribe({
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
    role: [],
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
