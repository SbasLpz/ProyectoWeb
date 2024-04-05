import { TestBed } from '@angular/core/testing';

import { DesechableService } from './desechable.service';

describe('DesechableService', () => {
  let service: DesechableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DesechableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
