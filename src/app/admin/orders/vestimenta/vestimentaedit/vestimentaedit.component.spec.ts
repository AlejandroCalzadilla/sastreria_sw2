import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VestimentaeditComponent } from './vestimentaedit.component';

describe('VestimentaeditComponent', () => {
  let component: VestimentaeditComponent;
  let fixture: ComponentFixture<VestimentaeditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VestimentaeditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VestimentaeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
