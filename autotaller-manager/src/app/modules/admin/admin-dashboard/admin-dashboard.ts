import { Component, AfterViewInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { forkJoin } from 'rxjs';
import { MockUserService } from '../../admin/services/mock-user';
import { MockVehicleService } from '../../admin/services/mock-vehicle';
import { MockSpareService } from '../../admin/services/mock-spares';
import { MockAnormalityService } from '../../admin/services/mock-anormality';

interface AuditAction {
  date: string;
  action: 'create' | 'update';
  entity: string;
}

@Component({
  standalone: true,
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements AfterViewInit {
  audits: AuditAction[] = [];

  constructor(
    private userService: MockUserService,
    private vehicleService: MockVehicleService,
    private spareService: MockSpareService,
    private anormalityService: MockAnormalityService
  ) {}

  ngAfterViewInit(): void {
    this.loadAllAudits();
  }

  loadAllAudits() {
    forkJoin([
      this.userService.getAll(),
      this.vehicleService.getVehicles(),
      this.spareService.getAll(),
      this.anormalityService.getAll()
    ]).subscribe(([users, vehicles, spares, anormalities]) => {
      const actions: AuditAction[] = [];

      users.forEach(u => {
        if (u.createdAt) actions.push({ date: this.formatDate(u.createdAt), action: 'create', entity: 'Usuarios' });
        if (u.updatedAt && u.updatedAt !== u.createdAt)
          actions.push({ date: this.formatDate(u.updatedAt), action: 'update', entity: 'Usuarios' });
      });

      vehicles.forEach(v => {
        if (v.createdAt) actions.push({ date: this.formatDate(v.createdAt), action: 'create', entity: 'Vehículos' });
        if (v.updatedAt && v.updatedAt !== v.createdAt)
          actions.push({ date: this.formatDate(v.updatedAt), action: 'update', entity: 'Vehículos' });
      });

      spares.forEach(s => {
        if (s.createdAt) actions.push({ date: this.formatDate(s.createdAt), action: 'create', entity: 'Repuestos' });
        if (s.updatedAt && s.updatedAt !== s.createdAt)
          actions.push({ date: this.formatDate(s.updatedAt), action: 'update', entity: 'Repuestos' });
      });

      anormalities.forEach(a => {
        if (a.createdAt) actions.push({ date: this.formatDate(a.createdAt), action: 'create', entity: 'Anormalidades' });
        if (a.updatedAt && a.updatedAt !== a.createdAt)
          actions.push({ date: this.formatDate(a.updatedAt), action: 'update', entity: 'Anormalidades' });
      });

      this.audits = actions;
      this.loadCharts();
    });
  }

  formatDate(date: Date | string): string {
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  }

  loadCharts(): void {
    Chart.defaults.color = '#ffffff';
    const created = this.getAuditStats('create');
    const updated = this.getAuditStats('update');
    const labels = [...new Set([...created.map(d => d.date), ...updated.map(d => d.date)])].sort();

    const createdCounts = labels.map(date => created.find(d => d.date === date)?.count || 0);
    const updatedCounts = labels.map(date => updated.find(d => d.date === date)?.count || 0);

    new Chart('lineChart', {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'Creados',
            data: createdCounts,
            fill: false,
            borderColor: '#10b981',
            tension: 0.4
          },
          {
            label: 'Actualizados',
            data: updatedCounts,
            fill: false,
            borderColor: '#3b82f6',
            tension: 0.4
          }
        ]
      }
    });

    new Chart('barChart', {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: 'Creados',
            data: createdCounts,
            backgroundColor: '#10b981'
          },
          {
            label: 'Actualizados',
            data: updatedCounts,
            backgroundColor: '#3b82f6'
          }
        ]
      }
    });

    const grouped = this.audits.reduce((acc, a) => {
      acc[a.entity] = (acc[a.entity] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    new Chart('doughnut1', {
      type: 'doughnut',
      data: {
        labels: Object.keys(grouped),
        datasets: [{
          data: Object.values(grouped),
          backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']
        }]
      }
    });
  }

  getAuditStats(type: 'create' | 'update') {
    const counts: Record<string, number> = {};
    this.audits.filter(a => a.action === type).forEach(a => {
      counts[a.date] = (counts[a.date] || 0) + 1;
    });
    return Object.entries(counts).map(([date, count]) => ({ date, count }));
  }
}