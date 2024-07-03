import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlnDetailsComponent } from './gln-details.component';

describe('GlnDetailsComponent', () => {
  let component: GlnDetailsComponent;
  let fixture: ComponentFixture<GlnDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GlnDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GlnDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
