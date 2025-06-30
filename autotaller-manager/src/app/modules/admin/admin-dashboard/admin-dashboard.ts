import { Component, AfterViewInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { forkJoin } from 'rxjs';
import { MockUserService } from '../../admin/services/mock-user';
import { MockVehicleService } from '../../admin/services/mock-vehicle';
import { MockSpareService } from '../../admin/services/mock-spares';
import { MockAnormalityService } from '../../admin/services/mock-anormality';
import { MockClientService } from '../../admin/services/mock-client';
import { MockServiceOrderService } from '../../admin/services/mock-service-order';

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
    private anormalityService: MockAnormalityService,
    private clientService: MockClientService,
    private serviceOrderService: MockServiceOrderService
  ) {}

  ngAfterViewInit(): void {
    this.loadAllAudits();
  }

  loadAllAudits() {
    forkJoin([
      this.userService.getAll(),
      this.vehicleService.getVehicles(),
      this.spareService.getAll(),
      this.anormalityService.getAll(),
      this.clientService.getAll(),
      this.serviceOrderService.getServiceOrders()
    ]).subscribe(([users, vehicles, spares, anormalities, clients, orders]) => {
      const actions: AuditAction[] = [];

      const register = (items: any[], entity: string) => {
        items.forEach(item => {
          if (item.createdAt)
            actions.push({ date: this.formatDate(item.createdAt), action: 'create', entity });
          if (item.updatedAt && item.updatedAt !== item.createdAt)
            actions.push({ date: this.formatDate(item.updatedAt), action: 'update', entity });
        });
      };

      register(users, 'Usuarios');
      register(vehicles, 'Vehículos');
      register(spares, 'Repuestos');
      register(anormalities, 'Anormalidades');
      register(clients, 'Clientes');
      register(orders, 'Órdenes');

      this.audits = actions;
      this.loadCharts(users, clients, vehicles, orders);
    });
  }

  formatDate(date: Date | string): string {
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  }

  loadCharts(users: any[], clients: any[], vehicles: any[], orders: any[]): void {
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

    const entityGroup = this.audits
      .filter(a => a.action === 'create')
      .reduce((acc, a) => {
        acc[a.entity] = (acc[a.entity] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

    new Chart('entityDistributionChart', {
      type: 'doughnut',
      data: {
        labels: Object.keys(entityGroup),
        datasets: [{
          data: Object.values(entityGroup),
          backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899']
        }]
      }
    });

    const roles = users.reduce((acc, u) => {
      acc[u.role] = (acc[u.role] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    new Chart('userRolesChart', {
      type: 'pie',
      data: {
        labels: Object.keys(roles),
        datasets: [{
          data: Object.values(roles),
          backgroundColor: ['#f87171', '#60a5fa', '#34d399']
        }]
      }
    });

    const statusMap: Record<number, string> = {
      1: 'Pendiente',
      2: 'En Proceso',
      3: 'Finalizado',
      4: 'Cancelado'
    };

    const orderStatus = orders.reduce((acc, o) => {
      let statusId: number | undefined;

      if (typeof o.status === 'number') {
        statusId = o.status;
      } else if (typeof o.status === 'object' && o.status?.id) {
        statusId = o.status.id;
      } else if (typeof o.statusId === 'number') {
        statusId = o.statusId;
      } else if (typeof o.id_status === 'number') {
        statusId = o.id_status;
      }

      const status = statusMap[statusId!] || 'Desconocido';
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    new Chart('orderStatusChart', {
      type: 'bar',
      data: {
        labels: Object.keys(orderStatus),
        datasets: [{
          label: 'Órdenes por Estado',
          data: Object.values(orderStatus),
          backgroundColor: Object.keys(orderStatus).map(status =>
            status.toLowerCase().includes('pendiente') ? '#ef4444' : '#10b981'
          )
        }]
      }
    });

    const vehiclesByClient = clients.map(c => {
      const count = vehicles.filter(v => v.clientId === c.id).length;
      return {
        label: `${c.name} ${c.lastname}`,
        count
      };
    }).filter(v => v.count > 0);

    if (vehiclesByClient.length > 0) {
      new Chart('vehiclesByClientChart', {
        type: 'bar',
        data: {
          labels: vehiclesByClient.map(v => v.label),
          datasets: [{
            label: 'Vehículos por Cliente',
            data: vehiclesByClient.map(v => v.count),
            backgroundColor: '#3b82f6'
          }]
        }
      });
    } else {
      const canvas = document.getElementById('vehiclesByClientChart') as HTMLCanvasElement;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.font = '16px sans-serif';
          ctx.fillStyle = '#ffffff';
          ctx.textAlign = 'center';
          ctx.fillText('Sin datos para mostrar', canvas.width / 2, canvas.height / 2);
        }
      }
    }
  }

  getAuditStats(type: 'create' | 'update') {
    const counts: Record<string, number> = {};
    this.audits.filter(a => a.action === type).forEach(a => {
      counts[a.date] = (counts[a.date] || 0) + 1;
    });
    return Object.entries(counts).map(([date, count]) => ({ date, count }));
  }
}
