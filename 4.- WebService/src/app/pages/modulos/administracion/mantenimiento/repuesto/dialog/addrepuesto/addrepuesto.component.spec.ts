import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddrepuestoComponent } from './addrepuesto.component';

describe('AddrepuestoComponent', () => {
  let component: AddrepuestoComponent;
  let fixture: ComponentFixture<AddrepuestoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddrepuestoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddrepuestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
