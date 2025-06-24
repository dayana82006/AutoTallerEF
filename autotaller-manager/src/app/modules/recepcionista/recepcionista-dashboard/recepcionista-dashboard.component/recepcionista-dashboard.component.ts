import { Component, AfterViewInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { CommonModule } from '@angular/common';
import { MockClientService } from '../../../admin/services/mock-client';
import { MockVehicleService } from '../../../admin/services/mock-vehicle';
import { MockServiceOrderService } from '../../../admin/services/mock-service-order';

@Component({
  standalone: true,
  selector: 'app-receptionist-dashboard',
  imports: [CommonModule],
  templateUrl: './recepcionista-dashboard.component.html',
  styleUrls: ['./recepcionista-dashboard.component.scss']
})
export class ReceptionistDashboardComponent implements AfterViewInit {

  constructor(
    private clientService: MockClientService,
    private vehicleService: MockVehicleService,
    private orderService: MockServiceOrderService
  ) {}

  ngAfterViewInit(): void {
    this.loadData();
  }

  loadData() {
    Promise.all([
      this.clientService.getAll().toPromise(),
      this.vehicleService.getVehicles().toPromise(),
      this.orderService.getServiceOrders().toPromise()
    ]).then(([clients, vehicles, orders]) => {
      if (clients && vehicles && orders) {
        this.renderCharts(clients, vehicles, orders);
      }
    });
  }

  renderCharts(clients: any[], vehicles: any[], orders: any[]) {
    const orderStates = orders.reduce((acc, o) => {
      const estado = o.status?.description ?? 'Desconocido';
      acc[estado] = (acc[estado] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    new Chart('orderStateChart', {
      type: 'bar',
      data: {
        labels: Object.keys(orderStates),
        datasets: [{
          label: 'Órdenes por estado',
          data: Object.values(orderStates),
          backgroundColor: Object.keys(orderStates).map(status =>
            status.toLowerCase().includes('pendiente') ? '#ef4444' : '#10b981'
          ),
          borderRadius: 10
        }]
      },
      options: {
        plugins: { legend: { display: false } },
        scales: { y: { ticks: { stepSize: 1 } } }
      }
    });

    const vehiclesByClient = clients.map(c => ({
      label: `${c.name} ${c.lastname}`,
      count: vehicles.filter(v => v.clientId === c.id).length
    })).filter(v => v.count > 0);

    new Chart('vehiclesByClientChart', {
      type: 'doughnut',
      data: {
        labels: vehiclesByClient.map(v => v.label),
        datasets: [{
          data: vehiclesByClient.map(v => v.count),
          backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899']
        }]
      },
      options: {
        plugins: { legend: { position: 'bottom' } }
      }
    });

    const ordersPerClient = clients.map(c => ({
      label: `${c.name} ${c.lastname}`,
      count: orders.filter(o => o.clientId === c.id).length
    })).filter(c => c.count > 0).sort((a, b) => b.count - a.count).slice(0, 5);

    new Chart('topClientsChart', {
      type: 'bar',
      data: {
        labels: ordersPerClient.map(c => c.label),
        datasets: [{
          label: 'Órdenes registradas',
          data: ordersPerClient.map(c => c.count),
          backgroundColor: '#6366f1',
          borderRadius: 10
        }]
      },
      options: {
        plugins: { legend: { display: false } },
        scales: { y: { beginAtZero: true } }
      }
    });

    const services = orders.reduce((acc, o) => {
      const tipo = o.serviceType?.description ?? 'Sin especificar';
      acc[tipo] = (acc[tipo] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    new Chart('serviceTypeChart', {
      type: 'pie',
      data: {
        labels: Object.keys(services),
        datasets: [{
          data: Object.values(services),
          backgroundColor: ['#f87171', '#34d399', '#60a5fa', '#eab308', '#a78bfa']
        }]
      },
      options: {
        plugins: { legend: { position: 'bottom' } }
      }
    });

    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());

    const weekData: Record<string, number> = {};
    for (let i = 0; i < 7; i++) {
      const d = new Date(startOfWeek);
      d.setDate(d.getDate() + i);
      const key = d.toISOString().split('T')[0];
      weekData[key] = 0;
    }

    orders.forEach(o => {
      const date = new Date(o.createdAt).toISOString().split('T')[0];
      if (date in weekData) weekData[date]++;
    });

    new Chart('ordersThisWeekChart', {
      type: 'line',
      data: {
        labels: Object.keys(weekData),
        datasets: [{
          label: 'Órdenes por Día',
          data: Object.values(weekData),
          borderColor: '#3b82f6',
          backgroundColor: '#3b82f6',
          tension: 0.3
        }]
      },
      options: {
        plugins: { legend: { display: false } },
        scales: { y: { beginAtZero: true } }
      }
    });
  }
}
