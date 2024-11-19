import { Component, Input ,EventEmitter, Output} from '@angular/core';
import { PanelAdminComponent } from "../../../../layouts/panel-admin/panel-admin.component";
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OrderService } from '../order.service';
import { firstValueFrom } from 'rxjs';
import { CreatebuttonComponent } from '../../../../layouts/createbutton/createbutton.component';
import { CommonModule } from '@angular/common';
import { CustomerService } from '../../../purchases/customer/customer.service';
import { VestimentaService } from '../../vestimenta/vestimenta.service';

@Component({
  selector: 'app-pedidoscreate',
  standalone: true,
  imports: [PanelAdminComponent,ReactiveFormsModule,CreatebuttonComponent,CommonModule],
  templateUrl: './pedidoscreate.component.html',
  styleUrl: './pedidoscreate.component.css'
})
export class PedidoscreateComponent {
  @Input() title: string = '';
  @Input() isOpen: boolean = false;
  @Output() isOpenChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() close: EventEmitter<void> = new EventEmitter<void>();
  @Output() itemCreated: EventEmitter<void> = new EventEmitter<void>();

  CreateForm: FormGroup;
  customers: any[] = [];
  garments: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private orderService: OrderService,
    private customerService: CustomerService,
    private vestimentaService: VestimentaService
  ) {
    this.CreateForm = this.formBuilder.group({
      customerId: ['', [Validators.required]],
      orderDate: ['', [Validators.required]],
      status: ['', [Validators.required]],
      totalPrice: ['', [Validators.required]],
      items: this.formBuilder.array([
        this.createItemFormGroup()
      ])
    });
  }

  ngOnInit(): void {
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

  createItemFormGroup(): FormGroup {
    return this.formBuilder.group({
      garmentId: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      price: ['', [Validators.required]],
      status: ['', [Validators.required]],
      measurementData: ['', [Validators.required]],
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
    return this.CreateForm.controls['customerId'];
  }

  get orderDate() {
    return this.CreateForm.controls['orderDate'];
  }

  get status() {
    return this.CreateForm.controls['status'];
  }

  get totalPrice() {
    return this.CreateForm.controls['totalPrice'];
  }

  get items() {
    return this.CreateForm.controls['items'] as FormArray;
  }

  async onSave() {
    if (this.CreateForm.invalid) {
      this.CreateForm.markAllAsTouched(); // Marcar todos los campos como tocados para mostrar los mensajes de error
      return;
    }

    try {
      const response = await firstValueFrom(this.orderService.createOrder(this.CreateForm.value));
      console.log('Respuesta del servidor:', response);
      this.itemCreated.emit();
      this.closeModal();
    } catch (error) {
      console.error('Error al guardar:', error);
    }
  }
}
