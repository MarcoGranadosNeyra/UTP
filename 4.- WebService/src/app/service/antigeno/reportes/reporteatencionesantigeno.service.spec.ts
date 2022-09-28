import { TestBed } from '@angular/core/testing';

import { ReporteatencionesantigenoService } from './reporteatencionesantigeno.service';

describe('ReporteatencionesantigenoService', () => {
  let service: ReporteatencionesantigenoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReporteatencionesantigenoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
