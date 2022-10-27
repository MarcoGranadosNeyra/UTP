import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcalendarioComponent } from './addcalendario.component';

describe('AddcalendarioComponent', () => {
  let component: AddcalendarioComponent;
  let fixture: ComponentFixture<AddcalendarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddcalendarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddcalendarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
