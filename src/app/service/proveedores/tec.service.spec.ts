import { TestBed } from '@angular/core/testing';

import { TecService } from './tec.service';

describe('TecService', () => {
  let service: TecService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TecService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
