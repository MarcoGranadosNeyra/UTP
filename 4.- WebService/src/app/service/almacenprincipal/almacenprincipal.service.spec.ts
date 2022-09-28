import { TestBed } from '@angular/core/testing';

import { AlmacenprincipalService } from './almacenprincipal.service';

describe('AlmacenprincipalService', () => {
  let service: AlmacenprincipalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlmacenprincipalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
