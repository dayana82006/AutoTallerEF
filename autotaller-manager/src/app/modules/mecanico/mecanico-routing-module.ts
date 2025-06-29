import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MecanicoLayoutComponent } from './mecanico-layout/mecanico-layout.component';

const routes: Routes = [
  {
    path: '',
    component: MecanicoLayoutComponent,  
    children: [
      {
        path: 'ordenes',
        loadComponent: () =>
          import('../admin/servicesTaller/services-order-crud.component/services-order-list/services-order-list').then(m => m.ServiceOrderListComponent)
      },
      { path: 'invoices/:id', 
        loadComponent: () => 
          import ('../admin/invoice-detail/invoice-detail.component').then(m=>m.InvoicePageComponent)
      },
      {
        path: '',
        loadComponent: () =>
          import('./mecanico-dashboard/mecanico-dashboard.component/mecanico-dashboard.component').then(m => m.MecanicoDashboardComponent)
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MecanicoRoutingModule {}
