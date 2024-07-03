import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProsyncHomeComponent } from './prosync-home.component';

describe('ProsyncHomeComponent', () => {
  let component: ProsyncHomeComponent;
  let fixture: ComponentFixture<ProsyncHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProsyncHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProsyncHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
