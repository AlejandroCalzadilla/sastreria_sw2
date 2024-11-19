import { Component, Input, Output, EventEmitter, OnChanges, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { VestimentaService } from '../../vestimenta/vestimenta.service';
import { firstValueFrom, Subscription } from 'rxjs';
import { CreatebuttonComponent } from '../../../../layouts/createbutton/createbutton.component';
import { CommonModule } from '@angular/common';
import { PanelAdminComponent } from "../../../../layouts/panel-admin/panel-admin.component";
import { OrderService } from '../order.service';
import { CustomerService } from '../../../purchases/customer/customer.service';

@Component({
  selector: 'app-pedidoedit',
  standalone: true,
  imports: [CreatebuttonComponent, CommonModule, ReactiveFormsModule, PanelAdminComponent],
  templateUrl: './pedidoedit.component.html',
  styleUrl: './pedidoedit.component.css'
})
export class PedidoeditComponent {
  @Input() title: string = '';
  @Input() isOpen: boolean = false;
  @Input() item: any; // El ítem a editar
  @Output() isOpenChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() close: EventEmitter<void> = new EventEmitter<void>();
  @Output() itemUpdated: EventEmitter<void> = new EventEmitter<void>();

  EditForm: FormGroup;
  customers: any[] = [];
  garments: any[] = [];
 
  private subscriptions: Subscription = new Subscription();


  constructor(
    private formBuilder: FormBuilder,
    private orderService: OrderService,
    private customerService: CustomerService,
    private vestimentaService: VestimentaService
  ) {
    this.EditForm = this.formBuilder.group({
      id: [''],
      customerId: ['', [Validators.required]],
      orderDate: ['', [Validators.required]],
      status: ['', [Validators.required]],
      totalPrice: ['', [Validators.required]],
      items: this.formBuilder.array([])
    });
  }

  ngOnChanges() {
    if (this.item) {
      this.EditForm.controls['id'].setValue(this.item.id);
      this.EditForm.controls['customerId'].setValue(this.item.customerId);
      this.EditForm.controls['orderDate'].setValue(this.item.orderDate);
      this.EditForm.controls['status'].setValue(this.item.status);
      this.EditForm.controls['totalPrice'].setValue(this.item.totalPrice);
      this.setItems(this.item.orderItems);
    }
    this.loadCustomers();
    this.loadGarments();
  }

  

  loadCustomers() {
    this.customerService.findAllCustomers().subscribe((response: any) => {
      this.customers = response.data.findAllCustomers;
    });
  }

  loadGarments() {
    this.vestimentaService.getAllGarment().subscribe((response: any) => {
      this.garments = response.data.getAllGarment;
    });
  }

  setItems(items: any[]) {
    const itemFGs = items.map(item => this.createItemFormGroup(item));
    const itemFormArray = this.formBuilder.array(itemFGs);
    this.EditForm.setControl('items', itemFormArray);
  }

  createItemFormGroup(item: any = {}): FormGroup {
    return this.formBuilder.group({
      garmentId: [item.garmentId || '', [Validators.required]],
      quantity: [item.quantity || '', [Validators.required]],
      price: [item.price || '', [Validators.required]],
      status: [item.status || '', [Validators.required]],
      measurementData: [item.measurementData || '', [Validators.required]],
    });
  }

  addItem() {
    this.items.push(this.createItemFormGroup());
  }

  removeItem(index: number) {
    this.items.removeAt(index);
  }

  closeModal() {
    this.isOpen = false;
    this.isOpenChange.emit(this.isOpen);
    this.close.emit();
  }

  get customerId() {
    return this.EditForm.controls['customerId'];
  }

  get orderDate() {
    return this.EditForm.controls['orderDate'];
  }

  get status() {
    return this.EditForm.controls['status'];
  }

  get totalPrice() {
    return this.EditForm.controls['totalPrice'];
  }

  get items() {
    return this.EditForm.controls['items'] as FormArray;
  }

  async onSave() {
    if (this.EditForm.invalid) {
      this.EditForm.markAllAsTouched(); // Marcar todos los campos como tocados para mostrar los mensajes de error
      return;
    }

    try {
      const response = await firstValueFrom(this.orderService.updateOrder(this.EditForm.value));
      console.log('Respuesta del servidor:', response);
      this.itemUpdated.emit(); // Emitir evento cuando se actualiza un ítem
      this.closeModal();
    } catch (error) {
      console.error('Error al guardar:', error);
    }
  }
}
