import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketStoreComponent } from './ticket-store.component';

describe('TicketStoreComponent', () => {
  let component: TicketStoreComponent;
  let fixture: ComponentFixture<TicketStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketStoreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
