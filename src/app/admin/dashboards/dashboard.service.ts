import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private apiUrl = 'http://localhost:8001'; // URL base de tu API FastAPI

  constructor(private http: HttpClient) {}

  // Endpoint para transferir datos manualmente
  

  // KPI 1: Ventas Totales por Mes
  
  
  getVentasTotalesPorMes(): Observable<any> {
    return this.http.get(`${this.apiUrl}/kpi/ventas_totales_por_mes`).pipe(
      tap((response: any) => console.log('Respuesta del servidor:', response))
    );;
  }

  // KPI 2: Cantidad de Prendas Vendidas por Tipo
  getCantidadPrendasPorTipo(): Observable<any> {
    return this.http.get(`${this.apiUrl}/kpi/cantidad_prendas_por_tipo`).pipe(
      tap((response: any) => console.log('Respuesta del servidor:', response))
    );
  }

  // KPI 3: Estados de Pedidos Actuales
  getEstadosPedidosActuales(): Observable<any> {
    return this.http.get(`${this.apiUrl}/kpi/estados_pedidos_actuales`).pipe(
      tap((response: any) => console.log('Respuesta del servidor:', response))
    );;
  }

  // KPI 4: Materiales más Utilizados
  getMaterialesMasUtilizados(): Observable<any> {
    return this.http.get(`${this.apiUrl}/kpi/materiales_mas_utilizados`).pipe(
      tap((response: any) => console.log('Respuesta del servidor:', response))
    );;
  }

  // KPI 5: Pedidos por Cliente
  getPedidosPorCliente(): Observable<any> {
    return this.http.get(`${this.apiUrl}/kpi/pedidos_por_cliente`);
  }

  // KPI 6: Cantidad en Inventario por Material y Tienda
  getCantidadInventarioPorMaterialYTienda(): Observable<any> {
    return this.http.get(`${this.apiUrl}/kpi/cantidad_inventario_por_material_y_tienda`);
  }

  // KPI 7: Cambios Realizados a Pedidos por Mes
  getCambiosRealizadosPorMes(): Observable<any> {
    return this.http.get(`${this.apiUrl}/kpi/cambios_realizados_por_mes`);
  }

  // KPI 8: Edad Promedio de los Clientes por Género
  getEdadPromedioPorGenero(): Observable<any> {
    return this.http.get(`${this.apiUrl}/kpi/edad_promedio_por_genero`);
  }

  // KPI 9: Costo Total por Prenda Producida
  getCostoTotalPorPrenda(): Observable<any> {
    return this.http.get(`${this.apiUrl}/kpi/costo_total_por_prenda`);
  }

  // KPI 10: Promedio de Prendas por Pedido
  getPromedioPrendasPorPedido(): Observable<any> {
    return this.http.get(`${this.apiUrl}/kpi/promedio_prendas_por_pedido`);
  }




  ventasDelMesActual(): Observable<any> {
    return this.http.get(`${this.apiUrl}/kpi/total_ventas_mes_actual`);
  }


  porcentajePedidosCompletados(){

    return this.http.get(`${this.apiUrl}/kpi/porcentaje_pedidos_completados`);

  

  }


  promediogastoporcliente(){

    return this.http.get(`${this.apiUrl}/kpi/promedio_gasto_por_cliente`);
      

  } 



}
