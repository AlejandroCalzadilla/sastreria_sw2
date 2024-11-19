import { Component } from '@angular/core';
import { PanelAdminComponent } from "../../../../layouts/panel-admin/panel-admin.component";
import { Router } from '@angular/router';
import { OrderService } from '../order.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { PedidoscreateComponent } from "../pedidoscreate/pedidoscreate.component";
import { CommonModule } from '@angular/common';
import { PedidoeditComponent } from "../pedidoedit/pedidoedit.component";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pedidosindex',
  standalone: true,
  imports: [PanelAdminComponent, NgxPaginationModule, PedidoscreateComponent, CommonModule, PedidoeditComponent],
  templateUrl: './pedidosindex.component.html',
  styleUrl: './pedidosindex.component.css'
})
export class PedidosindexComponent {

  orders: any[] = [];
  isModalOpen = false;
  isModalEditOpen = false;
  dropdownVisible: boolean[] = [];
  selectedItem: any; // Para almacenar el ítem a editar o eliminar
  currentPage = 1;
  itemsPerPage = 20;
  totalItems = 0;
  searchTerm: string = '';
  filteredOrders: any[] = [];
  private subscriptions: Subscription = new Subscription();

   
  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  loadData() {
    const offset = (this.currentPage - 1) * this.itemsPerPage;
    this.orderService.getOrders(this.itemsPerPage, offset).subscribe((response: any) => {
      console.log(response.data);
      this.orders = response.data.getOrders.items;
      this.totalItems = response.data.getOrders.totalCount;
      this.applySearchFilter();
    });
  }

  onItemCreated() {
    this.loadData();
  }

  onItemUpdated() {
    this.loadData();
  }

  toggleDropdown(index: number) {
    this.dropdownVisible[index] = !this.dropdownVisible[index]; // Alternar visibilidad específica
  }

  openModal() {
    this.isModalOpen = true;
  }

  onModalClose() {
    this.isModalOpen = false;
    this.isModalEditOpen = false;
  }

  applySearchFilter() {
    if (this.searchTerm) {
      this.filteredOrders = this.orders.filter(order => order.status.includes(this.searchTerm) || order.customerId.includes(this.searchTerm));
    } else {
      this.filteredOrders = this.orders;
    }
  }

  onSearch(term: string) {
    this.searchTerm = term;
    this.currentPage = 1; // Reiniciar la paginación a la primera página
    this.applySearchFilter();
  }

  editItem(order: any) {
    this.selectedItem = order; // Establece el ítem seleccionado
    this.isModalEditOpen = true; // Abre el modal de edición
  }

  deleteItem(order: any) {
    const confirmed = confirm('¿Estás seguro de que deseas eliminar este elemento?');
    if (confirmed) {
      this.orderService.deleteOrder(order.id).subscribe(() => {
        this.loadData(); // Recargar los datos después de eliminar
      });
    }
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.loadData();
  }

  

}
