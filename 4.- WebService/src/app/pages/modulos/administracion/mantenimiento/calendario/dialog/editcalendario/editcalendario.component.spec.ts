import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditcalendarioComponent } from './editcalendario.component';

describe('EditcalendarioComponent', () => {
  let component: EditcalendarioComponent;
  let fixture: ComponentFixture<EditcalendarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditcalendarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditcalendarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
