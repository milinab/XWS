import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestGradesAccomodationComponent } from './guest-grades-accomodation.component';

describe('GuestGradesAccomodationComponent', () => {
  let component: GuestGradesAccomodationComponent;
  let fixture: ComponentFixture<GuestGradesAccomodationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuestGradesAccomodationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuestGradesAccomodationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
