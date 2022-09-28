import { TestBed } from '@angular/core/testing';

import { CategoriaalmacenService } from './categoriaalmacen.service';

describe('CategoriaalmacenService', () => {
  let service: CategoriaalmacenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoriaalmacenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
