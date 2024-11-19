import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidosindexComponent } from './pedidosindex.component';

describe('PedidosindexComponent', () => {
  let component: PedidosindexComponent;
  let fixture: ComponentFixture<PedidosindexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PedidosindexComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PedidosindexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
