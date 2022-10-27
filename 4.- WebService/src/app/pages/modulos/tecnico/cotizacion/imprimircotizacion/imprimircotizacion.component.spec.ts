import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImprimircotizacionComponent } from './imprimircotizacion.component';

describe('ImprimircotizacionComponent', () => {
  let component: ImprimircotizacionComponent;
  let fixture: ComponentFixture<ImprimircotizacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImprimircotizacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImprimircotizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
