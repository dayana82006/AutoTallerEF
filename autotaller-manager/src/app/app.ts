import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AdminNavbarComponent } from './modules/admin/components/navbar/navbar';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, AdminNavbarComponent, NavbarComponent, CommonModule, HttpClientModule ],
  template: `
    <app-admin-navbar *ngIf="isAdminRoute()"></app-admin-navbar>
    <app-navbar *ngIf="!isAdminRoute()"></app-navbar>

    <router-outlet></router-outlet>
  `
})
export class AppComponent {
  constructor(private router: Router) {}

  isAdminRoute(): boolean {
    return this.router.url.startsWith('/admin');
  }
}
