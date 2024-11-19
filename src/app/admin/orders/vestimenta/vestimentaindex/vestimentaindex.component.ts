import { Component } from '@angular/core';
import { PanelAdminComponent } from '../../../../layouts/panel-admin/panel-admin.component';
import { VestimentaService } from '../vestimenta.service';
import { CommonModule } from '@angular/common';
import { VestimentacreateComponent } from "../vestimentacreate/vestimentacreate.component";
import { VestimentaeditComponent } from "../vestimentaedit/vestimentaedit.component";

@Component({
  selector: 'app-vestimentaindex',
  standalone: true,
  imports: [PanelAdminComponent, CommonModule, VestimentacreateComponent, VestimentaeditComponent],
  templateUrl: './vestimentaindex.component.html',
 
})
export class VestimentaindexComponent {
  garments: any[] = [];
  isModalOpen = false;
  isModalEditOpen = false;
  dropdownVisible: boolean[] = [];
  selectedItem: any; // Para almacenar el ítem a editar o eliminar
  currentPage = 1;
  itemsPerPage = 5;

  searchTerm: string = '';
  filteredGarments: any[] = [];

  constructor(private garmentService: VestimentaService) {}

  ngOnInit(): void {
    this.loadGarments();
  }

  loadGarments() {
    const offset = (this.currentPage - 1) * this.itemsPerPage;
    this.garmentService.getAllGarment().subscribe((response: any) => {
      console.log(response.data, "response");
      this.garments = response.data.getAllGarment;
    
      this.applySearchFilter();
    });
  }

  onItemCreated() {
    this.loadGarments();
  }

  onItemUpdated() {
    this.loadGarments();
  }

  openModal() {
    this.isModalOpen = true;
  }

  onModalClose() {
    this.isModalOpen = false;
  }

  applySearchFilter() {
    if (this.searchTerm) {
      this.filteredGarments = this.garments.filter(garment => garment.name.includes(this.searchTerm) || garment.description.includes(this.searchTerm));
    } else {
      this.filteredGarments = this.garments;
    }
  }

  onSearch(term: string) {
    this.searchTerm = term;
    this.currentPage = 1; // Reiniciar la paginación a la primera página
    this.applySearchFilter();
  }

  editItem(garment: any) {
     console.log('entra a editar'); 
    this.selectedItem = garment; // Establece el ítem seleccionado
    this.isModalEditOpen = true; // Abre el modal de edición
  }

  deleteItem(garment: any) {

    const confirmed = confirm('¿Estás seguro de que deseas eliminar este elemento?');
    if (confirmed) {
      this.garmentService.deleteGarment(garment.id).subscribe(() => {
        this.loadGarments(); // Recargar los datos después de eliminar
      });
    }
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.loadGarments();
  }
}
