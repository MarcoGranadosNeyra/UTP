import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddtecnicoComponent } from './addtecnico.component';

describe('AddtecnicoComponent', () => {
  let component: AddtecnicoComponent;
  let fixture: ComponentFixture<AddtecnicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddtecnicoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddtecnicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
