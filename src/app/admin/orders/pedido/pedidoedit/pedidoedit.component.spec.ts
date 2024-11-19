import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoeditComponent } from './pedidoedit.component';

describe('PedidoeditComponent', () => {
  let component: PedidoeditComponent;
  let fixture: ComponentFixture<PedidoeditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PedidoeditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PedidoeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
