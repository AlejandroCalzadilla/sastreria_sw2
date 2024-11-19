import { Component } from '@angular/core';
import { CustomerService } from '../../customer/customer.service';
import { PanelAdminComponent } from '../../../../layouts/panel-admin/panel-admin.component';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CreatebuttonComponent } from '../../../../layouts/createbutton/createbutton.component';
import { ModalCreateCustomerComponent } from '../../customer/modalcreate/modalcreate.component';
import { PaginationComponent } from '../../../../layouts/pagination/pagination.component';
import { FilterDropdownComponent } from '../../../../layouts/filter-dropdown/filter-dropdown.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { SearchComponent } from '../../../../layouts/search-component/search.component';
import { ModaleditCustomerComponent } from '../../customer/modaledit/modaledit.component';
import { StoreService } from '../store.service';
import { ModalcreatestoreComponent } from "../modalcreatestore/modalcreatestore.component";

@Component({
  selector: 'app-storeindex',
  standalone: true,
  imports: [PanelAdminComponent, CommonModule, RouterLink, RouterOutlet, CreatebuttonComponent,
    ModalCreateCustomerComponent, PaginationComponent, FilterDropdownComponent, NgxPaginationModule, SearchComponent, ModaleditCustomerComponent, ModalcreatestoreComponent],
 
  templateUrl: './storeindex.component.html',
  
})
export class StoreindexComponent {

 
  stores: any[] = [];
  isModalOpen = false;
  isModalEditOpen = false;
  dropdownVisible: boolean[] = [];
  selectedItem: any; // Para almacenar el ítem a editar o eliminar
  currentPage = 1;
  itemsPerPage = 5;
  totalItems = 0;
  searchTerm: string = '';
  filteredStores: any[] = [];

  constructor(private storeService: StoreService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    const offset = (this.currentPage - 1) * this.itemsPerPage;
    this.storeService.findAllStores().subscribe((response: any) => {
      console.log(response.data,"aver la data") 
      
      this.stores = response.data.findAllStore;
      //console.log(this.stores,"aver la data")
      //this.totalItems = this.stores.length; // Asegúrate de que tu backend devuelva el total de elementos
      //this.applySearchFilter();
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
      this.filteredStores = this.stores.filter(store => store.name.includes(this.searchTerm) || store.address.includes(this.searchTerm));
    } else {
      this.filteredStores = this.stores;
    }
  }

  onSearch(term: string) {
    this.searchTerm = term;
    this.currentPage = 1; // Reiniciar la paginación a la primera página
    this.applySearchFilter();
  }

  editItem(store: any) {
    this.selectedItem = store; // Establece el ítem seleccionado
    this.isModalEditOpen = true; // Abre el modal de edición
  }

  deleteItem(store: any) {
    const confirmed = confirm('¿Estás seguro de que deseas eliminar este elemento?');
    if (confirmed) {
      this.storeService.deleteStore(store.id).subscribe(() => {
        
        this.loadData(); // Recargar los datos después de eliminar
     
     
      });
    }
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.loadData();
  }

}
