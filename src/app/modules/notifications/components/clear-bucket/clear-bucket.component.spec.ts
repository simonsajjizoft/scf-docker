import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClearBucketComponent } from './clear-bucket.component';

describe('ClearBucketComponent', () => {
  let component: ClearBucketComponent;
  let fixture: ComponentFixture<ClearBucketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClearBucketComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClearBucketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
