import { TestBed } from '@angular/core/testing';

import { UnidadalmacenService } from './unidadalmacen.service';

describe('UnidadalmacenService', () => {
  let service: UnidadalmacenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnidadalmacenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
