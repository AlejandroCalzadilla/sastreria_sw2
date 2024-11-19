

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CreatebuttonComponent } from '../../../../layouts/createbutton/createbutton.component';
import { CommonModule } from '@angular/common';
import { CustomerService } from '../customer.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-modalcreate',
  standalone: true,
  imports: [CreatebuttonComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './modalcreate.component.html',
  styleUrls: ['./modalcreate.component.css']
})
export class ModalCreateCustomerComponent {
  @Input() title: string = '';
  @Input() isOpen: boolean = false;
  @Output() isOpenChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() close: EventEmitter<void> = new EventEmitter<void>();
  @Output() itemCreated: EventEmitter<void> = new EventEmitter<void>();

  CreateForm = this.formbuilder.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    ci: ['', [Validators.required]],
    birthDate: ['', [Validators.required]],
    sex: ['', [Validators.required]],
    telephones: this.formbuilder.array([
      this.formbuilder.group({
        number: ['', [Validators.required]],
        type: ['', [Validators.required]]
      })
    ])
  });

  constructor( private formbuilder: FormBuilder,private customerService: CustomerService, ) {



    
  }

  closeModal() {
    this.isOpen = false;
    this.isOpenChange.emit(this.isOpen);
    this.close.emit();
  }

  get firstName() {
    return this.CreateForm.controls.firstName;
  }

  get lastName() {
    return this.CreateForm.controls.lastName;
  }

  get ci() {
    return this.CreateForm.controls.ci;
  }

  get birthDate() {
    return this.CreateForm.controls.birthDate;
  }

  get sex() {
    return this.CreateForm.controls.sex;
  }

  get telephones() {
    return this.CreateForm.controls.telephones;
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
    if (this.CreateForm.invalid) {
      this.CreateForm.markAllAsTouched(); // Marcar todos los campos como tocados para mostrar los mensajes de error
      return;
    }

    try {
      const response = await firstValueFrom(this.customerService.createCustomer(this.CreateForm.value));
      console.log('Respuesta del servidor:', response);
      this.itemCreated.emit();
      this.closeModal();
    } catch (error) {
      console.error('Error al guardar:', error);
    }
  }




}