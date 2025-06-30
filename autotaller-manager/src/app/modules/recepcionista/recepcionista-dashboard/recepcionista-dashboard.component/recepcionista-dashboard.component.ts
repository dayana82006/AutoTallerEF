import { Component, AfterViewInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { CommonModule } from '@angular/common';
import { MockClientService } from '../../../admin/services/mock-client';
import { MockVehicleService } from '../../../admin/services/mock-vehicle';

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
    private vehicleService: MockVehicleService
  ) {}

  async ngAfterViewInit() {
    try {
      const [clients, vehicles] = await Promise.all([
        this.clientService.getAll().toPromise(),
        this.vehicleService.getVehicles().toPromise()
      ]);

      if (clients && vehicles) {
        this.renderCharts(clients, vehicles);
      }
    } catch (error) {
      console.error('Error cargando datos para el dashboard:', error);
    }
  }

  renderCharts(clients: any[], vehicles: any[]) {
    Chart.defaults.color = '#fff';

    // Clientes registrados esta semana
    const dias = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    const counts: number[] = new Array(7).fill(0);

    clients.forEach(c => {
      const date = new Date(c.createdAt);
      const day = date.getDay();
      counts[day]++;
    });

    new Chart('clientsThisWeekChart', {
      type: 'line',
      data: {
        labels: dias,
        datasets: [{
          label: 'Clientes',
          data: counts,
          borderColor: '#3b82f6',
          backgroundColor: '#3b82f6',
          tension: 0.4,
          fill: true
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } }
      }
    });

    // Vehículos por Cliente
    const vehiclesByClient = clients.map(c => ({
      label: `${c.name} ${c.lastname}`,
      count: vehicles.filter(v => v.clientId === c.id).length
    })).filter(x => x.count > 0);

    new Chart('vehiclesByClientChart', {
      type: 'doughnut',
      data: {
        labels: vehiclesByClient.map(x => x.label),
        datasets: [{
          data: vehiclesByClient.map(x => x.count),
          backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899']
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: 'bottom' } }
      }
    });
  }
}
