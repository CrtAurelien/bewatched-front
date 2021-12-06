import { TestBed } from '@angular/core/testing';

import { BurgerServiceService } from './burger-service.service';

describe('BurgerServiceService', () => {
  let service: BurgerServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BurgerServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
