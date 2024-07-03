import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GtinFormDetailsComponent } from './gtin-form-details.component';

describe('GtinFormDetailsComponent', () => {
  let component: GtinFormDetailsComponent;
  let fixture: ComponentFixture<GtinFormDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GtinFormDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GtinFormDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
