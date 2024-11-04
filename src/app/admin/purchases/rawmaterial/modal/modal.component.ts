import { Component, Input, Output,EventEmitter } from '@angular/core';

import { CreatebuttonComponent } from '../../../../layouts/createbutton/createbutton.component';
import { CommonModule } from '@angular/common';
import { RawmaterialService } from '../rawmaterial.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CreatebuttonComponent ,CommonModule,ReactiveFormsModule],
  templateUrl: './modalcreate.component.html',
  
})
export class ModalCreateComponent {


  
  @Input() title: string = '';

  @Input() isOpen: boolean = false;
  @Output() isOpenChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() close: EventEmitter<void> = new EventEmitter<void>();
  @Output() itemCreated: EventEmitter<void> = new EventEmitter<void>();

  
  CreateForm=this.formbuilder.group({
    nombre:['',[Validators.required,]],
    unidad:['',[Validators.required,]],
    
  })

  constructor(private rawmaterialService:RawmaterialService,private formbuilder:FormBuilder ) { }
  closeModal() {
    this.isOpen = false;
    this.isOpenChange.emit(this.isOpen);
    this.close.emit();
  }


  get nombre(){
    return this.CreateForm.controls.nombre
   }
   get unidad(){
    return this.CreateForm.controls.unidad
   } 

  async onSave() {
     
    if (this.CreateForm.invalid) {
      this.CreateForm.markAllAsTouched(); // Marcar todos los campos como tocados para mostrar los mensajes de error
      return;
    }


    try {
        console.log('prueba de que entra');
        const response = await firstValueFrom(this.rawmaterialService.create(this.CreateForm.value));
         await this.rawmaterialService.findAllRawMaterials(5,0);
        console.log('Respuesta del servidor:', response);
        this.itemCreated.emit(); 
      
      this.closeModal();
    
    
    } catch (error) {
      console.error('Error al guardar:', error);
    }
  } 
  
  

}
