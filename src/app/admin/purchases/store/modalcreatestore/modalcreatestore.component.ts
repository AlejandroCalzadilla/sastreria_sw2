
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CreatebuttonComponent } from '../../../../layouts/createbutton/createbutton.component';
import { CommonModule } from '@angular/common';
import { StoreService } from '../store.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-modalcreatestore',
  standalone: true,
  imports: [CreatebuttonComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './modalcreatestore.component.html',
  
})
export class ModalcreatestoreComponent {
  

  @Input() title: string = '';
  @Input() isOpen: boolean = false;
  @Output() isOpenChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() close: EventEmitter<void> = new EventEmitter<void>();
  @Output() itemCreated: EventEmitter<void> = new EventEmitter<void>();

  CreateForm = this.formbuilder.group({
    name: ['', [Validators.required]],
    address: ['', [Validators.required]],
  });

  constructor(private storeService: StoreService, private formbuilder: FormBuilder) {}

  closeModal() {
    this.isOpen = false;
    this.isOpenChange.emit(this.isOpen);
    this.close.emit();
  }

  get name() {
    return this.CreateForm.controls.name;
  }

  get address() {
    return this.CreateForm.controls.address;
  }

  async onSave() {
    if (this.CreateForm.invalid) {
      this.CreateForm.markAllAsTouched(); // Marcar todos los campos como tocados para mostrar los mensajes de error
      return;
    }

    try {
      const response = await firstValueFrom(this.storeService.createStore(this.CreateForm.value));
      console.log('Respuesta del servidor:', response);
      this.itemCreated.emit();
      this.closeModal();
    } catch (error) {
      console.error('Error al guardar:', error);
    }
  }


}
