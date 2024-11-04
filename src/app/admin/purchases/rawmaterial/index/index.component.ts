import { Component } from '@angular/core';
import { DashboardComponent } from "../../../dashboard/dashboard.component";
import { PanelAdminComponent } from "../../../../layouts/panel-admin/panel-admin.component";
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RawmaterialService } from '../rawmaterial.service';
import { CreatebuttonComponent } from "../../../../layouts/createbutton/createbutton.component";
import { ModalCreateComponent } from "../modal/modal.component";
import {PaginationComponent} from "../../../../layouts/pagination/pagination.component" 
import { FilterDropdownComponent } from '../../../../layouts/filter-dropdown/filter-dropdown.component';
import { SearchComponent } from '../../../../layouts/search-component/search.component';
import { ModaleditComponent } from '../modaledit/modaledit.component';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [PanelAdminComponent, CommonModule, RouterLink, RouterOutlet, CreatebuttonComponent, 
    ModalCreateComponent,PaginationComponent,FilterDropdownComponent,NgxPaginationModule,SearchComponent,ModaleditComponent],
  templateUrl: './index.component.html',

})
export class IndexComponent { 
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

  constructor(private rawMaterialService: RawmaterialService) { }
  
  ngOnInit(): void {  this.loadData();  }
  
  loadData() {
    const offset = (this.currentPage - 1) * this.itemsPerPage;
    this.rawMaterialService.findAllRawMaterials(this.itemsPerPage, offset).subscribe((response: any) => {
     console.log(response.data);

      this.datas = response.data.findAllRawMaterials.items;
      console.log(response.data.findAllRawMaterials.total);
      this.totalItems = response.data.findAllRawMaterials.total; // Asegúrate de que tu backend devuelva el total de elementos
      this.applySearchFilter();
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

    console.log('aplica el filtro de busqueda',this.searchTerm);
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
    console.log('abre el modal de edicion');
    this.selectedItem = data; // Establece el ítem seleccionado
    this.isModalEditOpen = true; // Abre el modal de edición
  }

  deleteItem(data: any) {
    const confirmed = confirm('¿Estás seguro de que deseas eliminar este elemento?');
    if (confirmed) {
      this.rawMaterialService.delete(data.id).subscribe(() => {  
        this.loadData(); // Recargar los datos después de eliminar
      }); 
    }
  }


  onPageChange(page: number) {
    this.currentPage = page;
    this.loadData();
  }
}
