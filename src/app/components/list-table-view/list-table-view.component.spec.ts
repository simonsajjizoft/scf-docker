import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTableViewComponent } from './list-table-view.component';

describe('ListTableViewComponent', () => {
  let component: ListTableViewComponent;
  let fixture: ComponentFixture<ListTableViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListTableViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListTableViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
