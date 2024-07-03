import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GtinsListComponent } from './gtins-list.component';

describe('GtinsListComponent', () => {
  let component: GtinsListComponent;
  let fixture: ComponentFixture<GtinsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GtinsListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GtinsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
