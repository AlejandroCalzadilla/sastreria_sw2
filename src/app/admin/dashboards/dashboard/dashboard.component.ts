import { Component, OnInit } from '@angular/core';
import { ChartData, ChartOptions, registerables } from 'chart.js';
import { DashboardService } from '../dashboard.service';
import { PanelAdminComponent } from "../../../layouts/panel-admin/panel-admin.component";
import { CommonModule } from '@angular/common';
import { Chart } from 'chart.js';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,RouterLink,RouterOutlet ,PanelAdminComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  ventasTotalesPorMesChart: any;
  cantidadPrendasPorTipoChart: any;

  pedidosPorClienteChart:any;

  cambiosPorMes:any;


  cambiosPorMesChart:any;
  promedioPorGeneroChart:any;
  estadosPedidosChart:any;


  ventasMesActualv: number = 0;
  pedidosCompletadosv: number = 0;
  promedioGastoPorClientev: number = 0;


  // ...other chart variables...

  constructor(private dashboardService: DashboardService) {

    Chart.register(...registerables);
  }

  ngOnInit() {
     this.dashboardService.getVentasTotalesPorMes().subscribe(data => {
      //console.log(data,"aver la data");
    }
    );
    
    this.loadVentasTotalesPorMes();
    this.loadCantidadPrendasPorTipo();
    this.loadPedidosPorCliente();
    this.loadCambiosPorMes();
    this.loadPromedioPorGenero();
    this.loadEstadosPedidos();
    this.ventasMesActual();
    this.promedioGastoPorCliente();
    this.pedidosCompletados();
    // ...load other charts...
  }
  loadVentasTotalesPorMes() {
    this.dashboardService.getVentasTotalesPorMes().subscribe(response => {
      const labels = response.data.map((item: any) => this.formatDate(item[0]));
      const values = response.data.map((item: any) => item[1]);
      //console.log(labels, values, "aver los label y values");
  
      this.ventasTotalesPorMesChart = new Chart('ventasTotalesPorMesChart', {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Ventas Totales por Mes',
            data: values,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    });
  }

   formatDate(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Añadir un 0 delante si es necesario
    return `${year}-${month}`;
  }
  
  loadCantidadPrendasPorTipo() {
    this.dashboardService.getCantidadPrendasPorTipo().subscribe(response => {
      const labels = response.data.map((item: any) => item[0]);
      const values = response.data.map((item: any) => item[1]);
      //console.log(labels, values, "aver la data de prendas");
  
      this.cantidadPrendasPorTipoChart = new Chart('cantidadPrendasPorTipoChart', {
        type: 'pie',
        data: {
          labels: labels,
          datasets: [{
            label: 'Cantidad de Prendas por Tipo',
            data: values,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true
        }
      });
    });
  }



  loadPedidosPorCliente() {
    this.dashboardService.getPedidosPorCliente().subscribe(response => {
      const labels = response.data.map((item: any) => item[0]);
      const cantidadPedidos = response.data.map((item: any) => item[1]);
      const dineroPedidos = response.data.map((item: any) => item[2]);
      //console.log(labels, cantidadPedidos, dineroPedidos, "pedidos por cliente data");
  
      this.pedidosPorClienteChart = new Chart('pedidosPorClienteChart', {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Cantidad de Pedidos',
              data: cantidadPedidos,
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1
            },
            {
              label: 'Dinero Total de Pedidos',
              data: dineroPedidos,
              backgroundColor: 'rgba(255, 206, 86, 0.2)',
              borderColor: 'rgba(255, 206, 86, 1)',
              borderWidth: 1
            }
          ]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          },
          responsive: true
        }
      });
    });
  }




  loadCambiosPorMes() {
    this.dashboardService.getCambiosRealizadosPorMes().subscribe(response => {
      const labels = response.data.map((item: any) => this.formatDate(item[0]));
      const values = response.data.map((item: any) => item[1]);
      //console.log(labels, values, "aver la data de cambios por mes");
  
      this.cambiosPorMesChart = new Chart('cambiosPorMesChart', {
        type: 'line',
        data: {
          labels: labels,
          datasets: [{
            label: 'Cambios por Mes',
            data: values,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            fill: false,
            tension: 0.1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          },
          responsive: true
        }
      });
    });
  }


  

  loadPromedioPorGenero() {
    this.dashboardService.getEdadPromedioPorGenero().subscribe(response => {
      const labels = response.data.map((item: any) => item[0]);
      const values = response.data.map((item: any) => item[1]);
      //console.log(labels, values, "data de los generos");
  
      this.promedioPorGeneroChart = new Chart('promedioPorGeneroChart', {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Promedio de Edad por Género',
            data: values,
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          },
          responsive: true
        }
      });
    });
  }
 


  loadEstadosPedidos() {
    this.dashboardService.getEstadosPedidosActuales().subscribe(response => {
      const labels = response.data.map((item: any) => item[0]);
      const values = response.data.map((item: any) => item[1]);
      //console.log(labels, values, "data de los estados");
  
      this.estadosPedidosChart = new Chart('estadosPedidosChart', {
        type: 'pie',
        data: {
          labels: labels,
          datasets: [{
            label: 'Estados de Pedidos',
            data: values,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true
        }
      });
    });
  }

   

  
  ventasMesActual() {
    this.dashboardService.ventasDelMesActual().subscribe(response => {
      this.ventasMesActualv = response.data;
      console.log(response, "data total venta mes actual");
    });
  }

  pedidosCompletados() {
    this.dashboardService.porcentajePedidosCompletados().subscribe((response: any) => {
      this.pedidosCompletadosv = response.data;
      console.log(response, "data de pedidos completados");
    });
  }

  promedioGastoPorCliente() {
    this.dashboardService.promediogastoporcliente().subscribe((response:any) => {
      this.promedioGastoPorClientev = response.data;
      console.log(response, "data de gasto por cliente");
    });
  }
    /*
   this.dashboardService.getMaterialesMasUtilizados().subscribe(response => {
     console.log(response.data, "aver la data de materiales");
  
   }); */




   



  // ...methods for other charts...
}
