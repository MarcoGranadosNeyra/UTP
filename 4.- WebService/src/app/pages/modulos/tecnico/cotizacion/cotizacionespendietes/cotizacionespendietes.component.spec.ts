import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CotizacionespendietesComponent } from './cotizacionespendietes.component';

describe('CotizacionespendietesComponent', () => {
  let component: CotizacionespendietesComponent;
  let fixture: ComponentFixture<CotizacionespendietesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CotizacionespendietesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CotizacionespendietesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
