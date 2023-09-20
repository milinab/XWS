import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostGradesComponent } from './host-grades.component';

describe('HostGradesComponent', () => {
  let component: HostGradesComponent;
  let fixture: ComponentFixture<HostGradesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HostGradesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HostGradesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
