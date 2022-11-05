import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CotizacionesfinalizadasComponent } from './cotizacionesfinalizadas.component';

describe('CotizacionesfinalizadasComponent', () => {
  let component: CotizacionesfinalizadasComponent;
  let fixture: ComponentFixture<CotizacionesfinalizadasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CotizacionesfinalizadasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CotizacionesfinalizadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
