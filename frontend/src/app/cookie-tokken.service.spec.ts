import { TestBed } from '@angular/core/testing';

import { CookieTokkenService } from './cookie-tokken.service';

describe('CookieTokkenService', () => {
  let service: CookieTokkenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CookieTokkenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
