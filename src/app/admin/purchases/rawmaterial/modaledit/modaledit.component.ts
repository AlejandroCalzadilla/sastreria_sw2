import { Component, Input, Output,EventEmitter } from '@angular/core';

import { CreatebuttonComponent } from '../../../../layouts/createbutton/createbutton.component';
import { CommonModule } from '@angular/common';
import { RawmaterialService } from '../rawmaterial.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-modaledit',
  standalone: true,
  imports: [CreatebuttonComponent ,CommonModule,ReactiveFormsModule],
  templateUrl: './modaledit.component.html',
 
})
export class ModaleditComponent {


  @Input() title: string = '';
  @Input() isOpen: boolean = false;
  @Input() item: any; // El ítem a editar
  @Output() isOpenChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() close: EventEmitter<void> = new EventEmitter<void>();
  @Output() itemUpdated: EventEmitter<void> = new EventEmitter<void>();

  EditForm = this.formbuilder.group({
    id: [''],
    name: ['', [Validators.required]],
    unit: ['', [Validators.required]],
  });

  constructor(private rawmaterialService: RawmaterialService, private formbuilder: FormBuilder) {}

  ngOnChanges() {
    if (this.item) {

      console.log(this.item.name); 
      this.EditForm.controls['id'].setValue(this.item.id);
      this.EditForm.controls['name'].setValue(this.item.name);
      this.EditForm.controls['unit'].setValue(this.item.unit);}
  }

  closeModal() {
    this.isOpen = false;
    this.isOpenChange.emit(this.isOpen);
    this.close.emit();
  }

  get nombre() {
    return this.EditForm.controls.name;
  }

  get unidad() {
    return this.EditForm.controls.unit;
  }

  async onSave() {

    console.log('prueba de que entra');
    if (this.EditForm.invalid) {
      this.EditForm.markAllAsTouched(); // Marcar todos los campos como tocados para mostrar los mensajes de error
      return;
    }

    try {
      const response = await firstValueFrom(this.rawmaterialService.edit(this.EditForm.value));
      console.log('Respuesta del servidor:', response);
      this.itemUpdated.emit(); // Emitir evento cuando se actualiza un ítem
      this.closeModal();
    } catch (error) {
      console.error('Error al guardar:', error);
    }
  }
  


}
