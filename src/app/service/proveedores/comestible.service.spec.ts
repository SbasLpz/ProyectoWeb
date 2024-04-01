import { TestBed } from '@angular/core/testing';

import { ComestibleService } from './comestible.service';

describe('ComestibleService', () => {
  let service: ComestibleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComestibleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
