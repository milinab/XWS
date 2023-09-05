import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradeAccomodationComponent } from './grade-accomodation.component';

describe('GradeAccomodationComponent', () => {
  let component: GradeAccomodationComponent;
  let fixture: ComponentFixture<GradeAccomodationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GradeAccomodationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GradeAccomodationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
