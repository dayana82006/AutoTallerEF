import { Component, AfterViewInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { MockServiceOrderService } from '../../../admin/services/mock-service-order';
import { AuthService } from '../../../auth/services/auth';

@Component({
  selector: 'app-mecanico-dashboard',
  templateUrl: './mecanico-dashboard.component.html',
  styleUrls: ['./mecanico-dashboard.component.scss']
})
export class MecanicoDashboardComponent implements AfterViewInit {
  constructor(
    private orderService: MockServiceOrderService,
    private authService: AuthService
  ) {}

  ngAfterViewInit(): void {
    this.loadData();
  }

  loadData() {
    this.orderService.getServiceOrders().subscribe(orders => {
      if (!orders) return;

      const myOrders = orders;

      this.renderStatusChart(myOrders);
      this.renderDailyWorkChart(myOrders);
      this.renderProgressChart(myOrders);
    });
  }

  renderStatusChart(orders: any[]) {
    const grouped = orders.reduce((acc, o) => {
      acc[o.status.description] = (acc[o.status.description] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    new Chart('statusChart', {
      type: 'bar',
      data: {
        labels: Object.keys(grouped),
        datasets: [{
          label: 'Órdenes por estado',
          data: Object.values(grouped),
          backgroundColor: ['#3b82f6', '#facc15', '#10b981']
        }]
      }
    });
  }

  renderDailyWorkChart(orders: any[]) {
    const days = [...Array(7)].map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - i);
      return d.toDateString();
    }).reverse();

    const count = days.map(day =>
      orders.filter(o => new Date(o.entryDate).toDateString() === day).length
    );

    new Chart('dailyWorkChart', {
      type: 'line',
      data: {
        labels: days,
        datasets: [{
          label: 'Órdenes por día',
          data: count,
          borderColor: '#4ade80',
          tension: 0.3
        }]
      }
    });
  }

  renderProgressChart(orders: any[]) {
    const estados = ['Pendiente', 'En proceso', 'Completada'];
    const data = estados.map(e => orders.filter(o => o.status.description === e).length);

    new Chart('progressChart', {
      type: 'pie',
      data: {
        labels: estados,
        datasets: [{
          data,
          backgroundColor: ['#f87171', '#facc15', '#10b981']
        }]
      }
    });
  }
}
