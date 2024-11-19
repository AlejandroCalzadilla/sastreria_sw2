import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CreatebuttonComponent } from '../../../../layouts/createbutton/createbutton.component';
import { CommonModule } from '@angular/common';
import { NoteService } from '../note.service';
import { StoreService } from '../../store/store.service';
import { RawmaterialService } from '../../rawmaterial/rawmaterial.service';
import { FormBuilder, FormArray, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { firstValueFrom, Subscription } from 'rxjs';

@Component({
  selector: 'app-modal-note-create',
  standalone: true,
  imports: [CreatebuttonComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './modal-create.component.html',
})
export class ModalCreateComponent implements OnInit {
  @Input() title: string = '';
  @Input() isOpen: boolean = false;
  @Output() isOpenChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() close: EventEmitter<void> = new EventEmitter<void>();
  @Output() itemCreated: EventEmitter<void> = new EventEmitter<void>();

  stores: any[] = [];
  rawMaterials: any[] = [];

  private subscriptions: Subscription = new Subscription();

  CreateForm = this.formbuilder.group({
    date: ['', [Validators.required]],
    type: ['', [Validators.required]],
    totalAmount: ['', [Validators.required]],
    store: ['', [Validators.required]],
    detailNotes: this.formbuilder.array([]) // Inicializar como FormArray
  });

  constructor(
    private noteService: NoteService,
    private storeService: StoreService,
    private rawMaterialService: RawmaterialService,
    private formbuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loadStores();
    
    
    this.loadRawMaterials();
  }

  
  
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  loadStores() {
    this.storeService.findAllStores().subscribe((response: any) => {
      //console.log('Stores:', response.data.findAllStore);
      this.stores = response.data.findAllStore;
    });
  }

  loadRawMaterials() {
    this.rawMaterialService.findAllRawMaterials(100,0).subscribe((response: any) => {
      //console.log('RawMaterials:', response.data.findAllRawMaterials);
      this.rawMaterials = response.data.findAllRawMaterials.items;
    });
  }

  closeModal() {
    this.isOpen = false;
    this.isOpenChange.emit(this.isOpen);
    this.close.emit();
  }

  get date() {
    return this.CreateForm.controls.date;
  }

  get type() {
    return this.CreateForm.controls.type;
  }

  get totalAmount() {
    return this.CreateForm.controls.totalAmount;
  }

  get store() {
    return this.CreateForm.controls.store;
  }

  get detailNotes() {
    return this.CreateForm.controls.detailNotes as FormArray;
  }

  addDetailNote() {
    this.detailNotes.push(this.formbuilder.group({
      quantity: ['', [Validators.required]],
      price: ['', [Validators.required]],
      rawMaterial: ['', [Validators.required]]
    }));
  }

  removeDetailNote(index: number) {
    this.detailNotes.removeAt(index);
  }

  async onSave() {
    if (this.CreateForm.invalid) {
      this.CreateForm.markAllAsTouched(); // Marcar todos los campos como tocados para mostrar los mensajes de error
      return;
    }
  
    const formValue = this.CreateForm.value;
    const note = {
      date: formValue.date,
      type: formValue.type,
      totalAmount: formValue.totalAmount,
      store: formValue.store,
      detailNotes: formValue.detailNotes?.map((detail: any) => ({
        quantity: detail.quantity,
        price: detail.price,
        rawMaterialId: detail.rawMaterial
      }))
    };
  
    try {
      const response = await firstValueFrom(this.noteService.createNote(note));
      console.log('Respuesta del servidor:', response);
      this.itemCreated.emit();
      this.closeModal(); 
    } catch (error) {
      console.error('Error al guardar:', error);
    }
  }
}