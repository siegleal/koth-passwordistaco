import { TestBed } from '@angular/core/testing';

import { GapiServiceService } from './gapi-service.service';

describe('GapiServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GapiServiceService = TestBed.get(GapiServiceService);
    expect(service).toBeTruthy();
  });
});
