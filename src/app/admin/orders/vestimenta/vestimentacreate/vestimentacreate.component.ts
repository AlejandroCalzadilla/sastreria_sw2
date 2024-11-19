import { Component, Input, Output ,EventEmitter} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { VestimentaService } from '../vestimenta.service';
import { firstValueFrom } from 'rxjs';
import { CreatebuttonComponent } from '../../../../layouts/createbutton/createbutton.component';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-vestimentacreate',
  standalone: true,
  imports: [CreatebuttonComponent,CommonModule,ReactiveFormsModule],
  templateUrl: './vestimentacreate.component.html',
  })
export class VestimentacreateComponent {
 
  @Input() title: string = '';
  @Input() isOpen: boolean = false;
  @Output() isOpenChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() close: EventEmitter<void> = new EventEmitter<void>();
  @Output() itemCreated: EventEmitter<void> = new EventEmitter<void>();

  CreateForm = this.formbuilder.group({
    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
    basePrice: ['', [Validators.required]],
    imageurl: ['', [Validators.required]],
  });

  constructor(private garmentService: VestimentaService, private formbuilder: FormBuilder) {}

  closeModal() {
    this.isOpen = false;
    this.isOpenChange.emit(this.isOpen);
    this.close.emit();
  }

  get name() {
    return this.CreateForm.controls.name;
  }

  get description() {
    return this.CreateForm.controls.description;
  }

  get basePrice() {
    return this.CreateForm.controls.basePrice;
  }

  get imageurl() {
    return this.CreateForm.controls.imageurl;
  }

  async onSave() {
    if (this.CreateForm.invalid) {
      this.CreateForm.markAllAsTouched(); // Marcar todos los campos como tocados para mostrar los mensajes de error
      return;
    }

    try {
      const response = await firstValueFrom(this.garmentService.createGarment(
        this.CreateForm.value.name!,
        this.CreateForm.value.description!,
        parseFloat(this.CreateForm.value.basePrice!),
        this.CreateForm.value.imageurl!
      ));
      console.log('Respuesta del servidor:', response);
      this.itemCreated.emit();
      this.closeModal();
      this.garmentService.getAllGarment();
    } catch (error) {
      console.error('Error al guardar:', error);
    }
  }
}
