import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtencionesfinalizadasComponent } from './atencionesfinalizadas.component';

describe('AtencionesfinalizadasComponent', () => {
  let component: AtencionesfinalizadasComponent;
  let fixture: ComponentFixture<AtencionesfinalizadasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtencionesfinalizadasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AtencionesfinalizadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
