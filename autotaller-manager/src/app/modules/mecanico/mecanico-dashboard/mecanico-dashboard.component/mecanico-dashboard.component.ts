import { Component, AfterViewInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { MockServiceOrderService } from '../../../admin/services/mock-service-order';

@Component({
  selector: 'app-mecanico-dashboard',
  templateUrl: './mecanico-dashboard.component.html',
  styleUrls: ['./mecanico-dashboard.component.scss']
})
export class MecanicoDashboardComponent implements AfterViewInit {
  constructor(private orderService: MockServiceOrderService) {}

  ngAfterViewInit(): void {
    this.loadData();
  }

  loadData() {
    this.orderService.getServiceOrders().subscribe(orders => {
      if (!orders) return;
      this.renderTotalOrdersChart(orders);
      this.renderDailyWorkChart(orders);
    });
  }

  renderTotalOrdersChart(orders: any[]) {
    new Chart('totalOrdersChart', {
      type: 'bar',
      data: {
        labels: ['Órdenes Totales'],
        datasets: [{
          label: 'Cantidad',
          data: [orders.length],
          backgroundColor: '#3b82f6',
          borderRadius: 10
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } }
      }
    });
  }

  renderDailyWorkChart(orders: any[]) {
    const today = new Date();
    const days = [...Array(7)].map((_, i) => {
      const d = new Date(today);
      d.setDate(d.getDate() - (6 - i));
      return d.toISOString().split('T')[0];
    });

    const counts = days.map(date =>
      orders.filter(o => new Date(o.createdAt).toISOString().split('T')[0] === date).length
    );

    new Chart('dailyWorkChart', {
      type: 'line',
      data: {
        labels: days,
        datasets: [{
          label: 'Órdenes por Día',
          data: counts,
          borderColor: '#4ade80',
          backgroundColor: '#4ade80',
          tension: 0.3
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: { y: { beginAtZero: true } }
      }
    });
  }
}
