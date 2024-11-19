import { Component, OnInit } from '@angular/core';
import { NoteService } from '../note.service';
import { PanelAdminComponent } from '../../../../layouts/panel-admin/panel-admin.component';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CreatebuttonComponent } from '../../../../layouts/createbutton/createbutton.component';
import { PaginationComponent } from '../../../../layouts/pagination/pagination.component';
import { FilterDropdownComponent } from '../../../../layouts/filter-dropdown/filter-dropdown.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { SearchComponent } from '../../../../layouts/search-component/search.component';
import { ModalCreateComponent } from '../modal-create/modal-create.component';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-note-index',
  standalone: true,
  imports: [
    PanelAdminComponent, CommonModule, RouterLink, RouterOutlet, CreatebuttonComponent,
    PaginationComponent, FilterDropdownComponent, NgxPaginationModule, SearchComponent,
    ModalCreateComponent
],templateUrl: './note-index.component.html',
 })
export class NoteIndexComponent {

  notes: any[] = [];
  isModalOpen = false;
  isModalEditOpen = false;
  dropdownVisible: boolean[] = [];
  selectedItem: any; // Para almacenar el ítem a editar o eliminar
  currentPage = 1;
  itemsPerPage = 20;
  totalItems = 0;
  searchTerm: string = '';
  filteredNotes: any[] = [];

  private subscriptions: Subscription = new Subscription();


  constructor(private noteService: NoteService) { }

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  loadData() {
    const offset = (this.currentPage - 1) * this.itemsPerPage;
     this.noteService.findAllNotes( this.itemsPerPage ,offset ).subscribe((response: any) => {
      console.log(response.data, "aver notas");
      this.notes = response.data.findAllNotes.items;
      this.totalItems =response.data.findAllNotes.total ; // Contar la cantidad de elementos en el array
      
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
      this.filteredNotes = this.notes.filter(note => note.type.includes(this.searchTerm) || note.store.includes(this.searchTerm));
    } else {
      this.filteredNotes = this.notes;
    }
  }

  onSearch(term: string) {
    this.searchTerm = term;
    this.currentPage = 1; // Reiniciar la paginación a la primera página
    this.applySearchFilter();
  }

  editItem(note: any) {
    this.selectedItem = note; // Establece el ítem seleccionado
    this.isModalEditOpen = true; // Abre el modal de edición
  }

  deleteItem(note: any) {
    const confirmed = confirm('¿Estás seguro de que deseas eliminar este elemento?');
    if (confirmed) {
       this.noteService.deleteNote(note.id).subscribe(() => {
        this.loadData(); // Recargar los datos después de eliminar
      }); 
    }
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.loadData();
  }
  
}
