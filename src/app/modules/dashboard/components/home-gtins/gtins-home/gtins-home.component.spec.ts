import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GtinsHomeComponent } from './gtins-home.component';

describe('GtinsHomeComponent', () => {
  let component: GtinsHomeComponent;
  let fixture: ComponentFixture<GtinsHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GtinsHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GtinsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
