import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestGradesComponent } from './guest-grades.component';

describe('GuestGradesComponent', () => {
  let component: GuestGradesComponent;
  let fixture: ComponentFixture<GuestGradesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuestGradesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuestGradesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
