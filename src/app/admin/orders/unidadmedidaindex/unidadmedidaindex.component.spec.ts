import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnidadmedidaindexComponent } from './unidadmedidaindex.component';

describe('UnidadmedidaindexComponent', () => {
  let component: UnidadmedidaindexComponent;
  let fixture: ComponentFixture<UnidadmedidaindexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnidadmedidaindexComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UnidadmedidaindexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
