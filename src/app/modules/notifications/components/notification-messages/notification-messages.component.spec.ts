import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationMessagesComponent } from './notification-messages.component';

describe('NotificationMessagesComponent', () => {
  let component: NotificationMessagesComponent;
  let fixture: ComponentFixture<NotificationMessagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotificationMessagesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NotificationMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
