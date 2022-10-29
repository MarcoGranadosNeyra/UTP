import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddequipoComponent } from './addequipo.component';

describe('AddequipoComponent', () => {
  let component: AddequipoComponent;
  let fixture: ComponentFixture<AddequipoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddequipoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddequipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
