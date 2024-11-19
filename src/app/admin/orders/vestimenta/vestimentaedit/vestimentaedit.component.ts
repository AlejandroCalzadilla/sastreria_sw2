import { Component, Input, Output,EventEmitter } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { VestimentaService } from '../vestimenta.service';
import { firstValueFrom } from 'rxjs';
import { PanelAdminComponent } from "../../../../layouts/panel-admin/panel-admin.component";
import { CommonModule } from '@angular/common';
import { CreatebuttonComponent } from '../../../../layouts/createbutton/createbutton.component';

@Component({
  selector: 'app-vestimentaedit',
  standalone: true,
  imports: [PanelAdminComponent,CommonModule,ReactiveFormsModule,CreatebuttonComponent],
  templateUrl: './vestimentaedit.component.html',
  styleUrl: './vestimentaedit.component.css'
})
export class VestimentaeditComponent {

  @Input() title: string = '';
  @Input() isOpen: boolean = false;
  @Input() item: any; // El ítem a editar
  @Output() isOpenChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() close: EventEmitter<void> = new EventEmitter<void>();
  @Output() itemUpdated: EventEmitter<void> = new EventEmitter<void>();

  EditForm = this.formbuilder.group({
    id: [''],
    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
    basePrice: ['', [Validators.required]],
    imageurl: ['', [Validators.required]],
  });

  constructor(private vestimentaService: VestimentaService, private formbuilder: FormBuilder) {}

  ngOnChanges() {
    if (this.item) {
      this.EditForm.controls['id'].setValue(this.item.id);
      this.EditForm.controls['name'].setValue(this.item.name);
      this.EditForm.controls['description'].setValue(this.item.description);
      this.EditForm.controls['basePrice'].setValue(this.item.basePrice);
      this.EditForm.controls['imageurl'].setValue(this.item.imageurl);
    }
  }

  closeModal() {
    this.isOpen = false;
    this.isOpenChange.emit(this.isOpen);
    this.close.emit();
  }

  get name() {
    return this.EditForm.controls.name;
  }

  get description() {
    return this.EditForm.controls.description;
  }

  get basePrice() {
    return this.EditForm.controls.basePrice;
  }

  get imageurl() {
    return this.EditForm.controls.imageurl;
  }

  async onSave() {
    if (this.EditForm.invalid) {
      this.EditForm.markAllAsTouched(); // Marcar todos los campos como tocados para mostrar los mensajes de error
      return;
    }

    try {
      const response = await firstValueFrom(this.vestimentaService.updateGarment(
        this.EditForm.value.id!,
        this.EditForm.value.name!,
        this.EditForm.value.description!,
        parseFloat(this.EditForm.value.basePrice!),
        this.EditForm.value.imageurl!
      ));
      console.log('Respuesta del servidor:', response);
      this.itemUpdated.emit(); // Emitir evento cuando se actualiza un ítem
      this.closeModal();
    } catch (error) {
      console.error('Error al guardar:', error);
    }
  }

}
