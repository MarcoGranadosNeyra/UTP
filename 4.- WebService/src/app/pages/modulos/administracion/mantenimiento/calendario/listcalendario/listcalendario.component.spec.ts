import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListcalendarioComponent } from './listcalendario.component';

describe('ListcalendarioComponent', () => {
  let component: ListcalendarioComponent;
  let fixture: ComponentFixture<ListcalendarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListcalendarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListcalendarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
