import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CotizacionesaprobadasComponent } from './cotizacionesaprobadas.component';

describe('CotizacionesaprobadasComponent', () => {
  let component: CotizacionesaprobadasComponent;
  let fixture: ComponentFixture<CotizacionesaprobadasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CotizacionesaprobadasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CotizacionesaprobadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
