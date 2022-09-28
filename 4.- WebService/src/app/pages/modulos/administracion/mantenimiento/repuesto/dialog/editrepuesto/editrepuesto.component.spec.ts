import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditrepuestoComponent } from './editrepuesto.component';

describe('EditrepuestoComponent', () => {
  let component: EditrepuestoComponent;
  let fixture: ComponentFixture<EditrepuestoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditrepuestoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditrepuestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
