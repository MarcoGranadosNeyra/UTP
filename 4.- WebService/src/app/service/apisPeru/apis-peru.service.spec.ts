import { TestBed } from '@angular/core/testing';

import { ApisPeruService } from './apis-peru.service';

describe('ApisPeruService', () => {
  let service: ApisPeruService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApisPeruService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
