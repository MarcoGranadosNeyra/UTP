import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistradoComponent } from './registrado.component';

describe('RegistradoComponent', () => {
  let component: RegistradoComponent;
  let fixture: ComponentFixture<RegistradoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistradoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistradoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
