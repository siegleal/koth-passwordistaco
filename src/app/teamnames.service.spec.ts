import { TestBed } from '@angular/core/testing';

import { TeamnamesService } from './teamnames.service';

describe('TeamnamesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TeamnamesService = TestBed.get(TeamnamesService);
    expect(service).toBeTruthy();
  });
});
