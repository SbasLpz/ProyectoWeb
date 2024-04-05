import { TestBed } from '@angular/core/testing';

import { LimpiezaService } from './limpieza.service';

describe('LimpiezaService', () => {
  let service: LimpiezaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LimpiezaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
