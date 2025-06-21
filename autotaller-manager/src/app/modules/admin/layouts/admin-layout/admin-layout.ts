import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminNavbarComponent } from '../../components/navbar/navbar';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, AdminNavbarComponent],
  templateUrl: './admin-layout.html'
})
export class AdminLayoutComponent {}
