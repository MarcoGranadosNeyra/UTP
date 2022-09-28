import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditmoduloComponent } from './editmodulo.component';

describe('EditmoduloComponent', () => {
  let component: EditmoduloComponent;
  let fixture: ComponentFixture<EditmoduloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditmoduloComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditmoduloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
