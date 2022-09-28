import { TestBed } from '@angular/core/testing';

import { ProductoalmacenService } from './productoalmacen.service';

describe('ProductoalmacenService', () => {
  let service: ProductoalmacenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductoalmacenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
