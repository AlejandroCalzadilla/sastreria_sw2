import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoscreateComponent } from './pedidoscreate.component';

describe('PedidoscreateComponent', () => {
  let component: PedidoscreateComponent;
  let fixture: ComponentFixture<PedidoscreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PedidoscreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PedidoscreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
