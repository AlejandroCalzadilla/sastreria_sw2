import { Component } from '@angular/core';
import { PanelAdminComponent } from "../../../../layouts/panel-admin/panel-admin.component";
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CustomerService } from '../customer.service';
import { CreatebuttonComponent } from '../../../../layouts/createbutton/createbutton.component';
import {ModalCreateCustomerComponent } from "../modalcreate/modalcreate.component";
import {PaginationComponent} from "../../../../layouts/pagination/pagination.component" 
import { FilterDropdownComponent } from '../../../../layouts/filter-dropdown/filter-dropdown.component';
import { SearchComponent } from '../../../../layouts/search-component/search.component';
import { ModaleditCustomerComponent } from '../modaledit/modaledit.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-customerindex',
  standalone: true,
  imports: [PanelAdminComponent, CommonModule, RouterLink, RouterOutlet, CreatebuttonComponent, 
    ModalCreateCustomerComponent,PaginationComponent,FilterDropdownComponent,NgxPaginationModule,SearchComponent,ModaleditCustomerComponent],
  templateUrl: './customerindex.component.html',

})
export class CustomerindexComponent {


  datas :any[] = [];
  isModalOpen = false;
  isModalEditOpen=false;
 
  dropdownVisible: boolean[] = [];
  selectedItem: any; // Para almacenar el ítem a editar o eliminar
 
  currentPage = 1;
  itemsPerPage = 5;
  totalItems = 0;


  searchTerm: string = '';
  filteredDatas: any[] = [];

  private subscriptions: Subscription = new Subscription();

  constructor(private customerService: CustomerService) { }
  
  ngOnInit(): void {  this.loadData();  }
  
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  loadData() {
    const offset = (this.currentPage - 1) * this.itemsPerPage;
    this.customerService.findAllCustomers().subscribe((response: any) => {
     //console.log(response.data);

      this.datas = response.data.findAllCustomers;
      //console.log(response.data.findAllCustomers, "aver find");
      //this.totalItems = response.data.findAllRawMaterials.total; // Asegúrate de que tu backend devuelva el total de elementos
      //this.applySearchFilter();
    });
  }

  onItemCreated() {
    this.loadData(); 
  }

  onItemUpdated() {
    this.loadData(); 
  }

  

  openModal() {
    console.log('abre el modal');
    this.isModalOpen = true;
  }


  onModalClose() {
    this.isModalOpen = false;
  } 



  applySearchFilter() {

    //console.log('aplica el filtro de busqueda',this.searchTerm);
    if (this.searchTerm) {
      this.filteredDatas = this.datas.filter(data => data.name.includes(this.searchTerm) || data.unit.includes(this.searchTerm));
    } else {
      this.filteredDatas = this.datas;
    }
  }
  onSearch(term: string) {
    this.searchTerm = term;
    this.currentPage = 1; // Reiniciar la paginación a la primera página
    this.applySearchFilter();
  }



  editItem(data: any) {
   // console.log('abre el modal de edicion');
    this.selectedItem = data; // Establece el ítem seleccionado
    this.isModalEditOpen = true; // Abre el modal de edición
  }

  deleteItem(data: any) {
    const confirmed = confirm('¿Estás seguro de que deseas eliminar este elemento?');
    if (confirmed) {
       console.log("entra al delete")
      this.customerService.deleteCustomer(data.id).subscribe(() => {  
        this.loadData(); // Recargar los datos después de eliminar
      }); 
    }
  }


  onPageChange(page: number) {
    this.currentPage = page;
    this.loadData();
  }

}
