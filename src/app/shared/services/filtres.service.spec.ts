import { TestBed } from '@angular/core/testing';

import { FiltresService } from './filtres.service';

describe('FiltresService', () => {
  let service: FiltresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FiltresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
