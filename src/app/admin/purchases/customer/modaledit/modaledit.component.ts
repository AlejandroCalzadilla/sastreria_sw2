import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CreatebuttonComponent } from '../../../../layouts/createbutton/createbutton.component';
import { CommonModule } from '@angular/common';
import { CustomerService } from '../customer.service';
import { FormBuilder, FormArray, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-modaleditcustomer',
  standalone: true,
  imports: [CreatebuttonComponent ,CommonModule,ReactiveFormsModule],
  templateUrl: './modaledit.component.html',
  
})
export class ModaleditCustomerComponent implements OnChanges {
  @Input() title: string = '';
  @Input() isOpen: boolean = false;
  @Input() item: any; // El ítem a editar
  @Output() isOpenChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() close: EventEmitter<void> = new EventEmitter<void>();
  @Output() itemUpdated: EventEmitter<void> = new EventEmitter<void>();

  EditForm = this.formbuilder.group({
    id: [''],
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    ci: ['', [Validators.required]],
    birthDate: ['', [Validators.required]],
    sex: ['', [Validators.required]],
    telephones: this.formbuilder.array([]) // Define telephones como FormArray
  });
  

  constructor(private formbuilder: FormBuilder, private customerService: CustomerService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['item'] && this.item) {
      this.EditForm.patchValue({
        id: this.item.id,
        firstName: this.item.firstName,
        lastName: this.item.lastName,
        ci: this.item.ci,
        birthDate: this.item.birthDate,
        sex: this.item.sex
      });
      this.setTelephones(this.item.telephones);
    }
  }
// Método para crear un FormGroup para un teléfono
createTelephoneFormGroup(telephone: any): FormGroup {
  return this.formbuilder.group({
    number: [telephone.number, [Validators.required]],
    type: [telephone.type, [Validators.required]]
  });
}

// Método para establecer los teléfonos en el FormArray
setTelephones(telephones: any[]) {
  const telephonesFormArray = this.EditForm.get('telephones') as FormArray;
  telephonesFormArray.clear(); // Limpia el array actual antes de cargar nuevos datos
  telephones.forEach(telephone => {
    telephonesFormArray.push(this.createTelephoneFormGroup(telephone));
  });
}
  

  closeModal() {
    this.isOpen = false;
    this.isOpenChange.emit(this.isOpen);
    this.close.emit();
  }

  get firstName() {
    return this.EditForm.controls.firstName;
  }

  get lastName() {
    return this.EditForm.controls.lastName;
  }

  get ci() {
    return this.EditForm.controls.ci;
  }

  get birthDate() {
    return this.EditForm.controls.birthDate;
  }

  get sex() {
    return this.EditForm.controls.sex;
  }

  get telephones() {
    return this.EditForm.controls.telephones as FormArray;
  }

  addTelephone() {
    this.telephones.push(this.formbuilder.group({
      number: ['', [Validators.required]],
      type: ['', [Validators.required]]
    }));
  }

  removeTelephone(index: number) {
    this.telephones.removeAt(index);
  }

  async onSave() {
    if (this.EditForm.invalid) {
      this.EditForm.markAllAsTouched(); // Marcar todos los campos como tocados para mostrar los mensajes de error
      return;
    }

    try {
      const response = await firstValueFrom(this.customerService.updateCustomer(this.EditForm.value));
      console.log('Respuesta del servidor:', response);
      this.itemUpdated.emit();
      this.closeModal();
    } catch (error) {
      console.error('Error al guardar:', error);
    }
  }  

}
