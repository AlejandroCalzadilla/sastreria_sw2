import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedidaindexComponent } from './medidaindex.component';

describe('MedidaindexComponent', () => {
  let component: MedidaindexComponent;
  let fixture: ComponentFixture<MedidaindexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedidaindexComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MedidaindexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
